import React, { useEffect, useState } from 'react';
import { getSize } from '../../../../service/sizeService';
import { postPrice } from '../../../../service/priceService';
import { Precio } from '../../../../types/precio';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { uploadImageToCloudinary } from '../../../../service/cloudinaryService';

export const AgregarDetalle = ({
    nuevoDetalle,
    setNuevoDetalle,
    onCancel,
    producto,
    setProducto,
    setMostrarFormDetalle,
    getProductoPorId,
    postDetalle
}: any) => {
    const [sizes, setSizes] = useState<any[]>([]);
    const [subiendoImagen, setSubiendoImagen] = useState(false);

    useEffect(() => {
        const fetchSizes = async () => {
            const data = await getSize();
            setSizes(data);
        };
        fetchSizes();
    }, []);
    const [precioId, setprecioId] = useState<Precio | null>(null)

    const detalleSchema = Yup.object().shape({
        colour: Yup.string().required('El color es obligatorio'),
        sizeId: Yup.number().required('El talle es obligatorio').positive().integer(),
        stock: Yup.number().required('Las existencias son obligatorias').min(0, 'Las existencias no pueden ser negativas').integer('Las existencias deben ser un número entero'),
        purchasePrice: Yup.number().required('El valor de compra es obligatorio').min(0, 'El valor de compra debe ser mayor o igual a 0'),
        sellingPrice: Yup.number().required('El valor de venta es obligatorio').min(0, 'El valor de venta debe ser mayor o igual a 0'),
        state: Yup.boolean().required('El estado es obligatorio'),
        brand: Yup.string(),
        imageUrls: Yup.array()
            .of(Yup.string().url('Debe ser una URL válida'))
            .min(1, 'Debes subir al menos una imagen')
    });

    // Cambia imageUrl por imageUrls (array)
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setSubiendoImagen(true);
        try {
            const urls: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const url = await uploadImageToCloudinary(files[i]);
                urls.push(url);
            }
            setNuevoDetalle({ ...nuevoDetalle, imageUrls: urls });
            Swal.fire('Imágenes subidas', 'Las imágenes se subieron correctamente', 'success');
        } catch (error) {
            Swal.fire('Error', 'No se pudieron subir las imágenes', 'error');
        } finally {
            setSubiendoImagen(false);
        }
    };

    const handleAgregarDetalle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!producto) return;
        try {
            const detalleAValidar = {
                ...nuevoDetalle,
                state: nuevoDetalle.state === true || nuevoDetalle.state === "true"
            };
            await detalleSchema.validate(detalleAValidar, { abortEarly: false });

            const price = await postPrice({
                purchasePrice: nuevoDetalle.purchasePrice,
                sellingPrice: nuevoDetalle.sellingPrice
            });

            await postDetalle({
                ...nuevoDetalle,
                productIdj: { id: producto.id },
                sizeId: { id: Number(nuevoDetalle.sizeId) },
                prizeId: { id: price.id },
                state: detalleAValidar.state,
                imageUrls: nuevoDetalle.imageUrls || [] // Envía el array de URLs
            });

            setMostrarFormDetalle(false);
            setNuevoDetalle({});
            const data = await getProductoPorId(producto.id);
            setProducto(data);
            Swal.fire('¡Éxito!', 'Detalle agregado correctamente', 'success');
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                Swal.fire('Error de validación', error.errors.join('<br>'), 'error');
            } else {
                Swal.fire('Error', error?.message || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <form className="detalle-producto-form" onSubmit={handleAgregarDetalle}>
            <h4>Agregar detalle</h4>
            <input
                name="colour"
                placeholder="Color"
                value={nuevoDetalle.colour || ''}
                onChange={e => setNuevoDetalle({ ...nuevoDetalle, colour: e.target.value })}
                required
            />
            <select
                name="sizeId"
                value={nuevoDetalle.sizeId || ''}
                onChange={e => setNuevoDetalle({ ...nuevoDetalle, sizeId: e.target.value })}
                required
            >
                <option value="">Seleccionar talle</option>
                {sizes.map(size => (
                    <option key={size.id} value={size.id}>
                        {size.number}
                    </option>
                ))}
            </select>
            <input
                name="stock"
                type="number"
                placeholder="Existencias"
                value={nuevoDetalle.stock || ''}
                onChange={e => setNuevoDetalle({ ...nuevoDetalle, stock: e.target.value })}
                required
            />
            <input
                name="purchasePrice"
                type="number"
                placeholder="Valor compra"
                value={nuevoDetalle.purchasePrice || ''}
                onChange={e => setNuevoDetalle({ ...nuevoDetalle, purchasePrice: e.target.value })}
                required
            />
            <input
                name="sellingPrice"
                type="number"
                placeholder="Valor venta"
                value={nuevoDetalle.sellingPrice || ''}
                onChange={e => setNuevoDetalle({ ...nuevoDetalle, sellingPrice: e.target.value })}
                required
            />
            <select
                name="state"
                value={nuevoDetalle.state ?? true}
                onChange={e => setNuevoDetalle({ ...nuevoDetalle, state: e.target.value === "true" })}
                required
            >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
            </select>
            <input
                name="brand"
                placeholder="Marca"
                value={nuevoDetalle.brand || ''}
                onChange={e => setNuevoDetalle({ ...nuevoDetalle, brand: e.target.value })}
            />
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={subiendoImagen}
            />
            {subiendoImagen && <p>Subiendo imágenes...</p>}
            {nuevoDetalle.imageUrls && nuevoDetalle.imageUrls.length > 0 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    {nuevoDetalle.imageUrls.map((url: string, idx: number) => (
                        <img key={idx} src={url} alt={`Vista previa ${idx + 1}`} style={{ maxWidth: 100 }} />
                    ))}
                </div>
            )}
            <button type="submit" disabled={subiendoImagen}>Guardar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

