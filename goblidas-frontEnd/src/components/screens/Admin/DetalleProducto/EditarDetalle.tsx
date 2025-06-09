import React, { useEffect, useState } from 'react';
import { getSize } from '../../../../service/sizeService';
import { putDetalle } from '../../../../service/detailService';
import { putPrice } from '../../../../service/priceService';
import { uploadImageToCloudinary } from '../../../../service/cloudinaryService';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const detalleSchema = Yup.object().shape({
    colour: Yup.string().required('El color es obligatorio'),
    sizeId: Yup.mixed().required('El talle es obligatorio'),
    stock: Yup.number().required('Las existencias son obligatorias').min(0, 'Las existencias no pueden ser negativas'),
    prizeId: Yup.object().shape({
        purchasePrice: Yup.number().required('El valor de compra es obligatorio').min(0, 'El valor de compra no puede ser negativo'),
        sellingPrice: Yup.number().required('El valor de venta es obligatorio').min(0, 'El valor de venta no puede ser negativo')
    }),
    state: Yup.boolean().required('El estado es obligatorio'),
    brand: Yup.string(),
    imageUrls: Yup.array()
        .of(Yup.string().url('Debe ser una URL válida'))
        .min(1, 'Debes subir al menos una imagen')
});

export const EditarDetalle = ({
    detalleEditando,
    setDetalleEditando,
    onCancel,
    setMostrarFormDetalle,
    producto,
    setProducto,
    getProductoPorId
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

    // Subida de imágenes a Cloudinary
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
            // Agrega las nuevas imágenes a las existentes
            setDetalleEditando({
                ...detalleEditando,
                imageUrls: [...(detalleEditando.imageUrls || []), ...urls]
            });
            Swal.fire('Imágenes subidas', 'Las imágenes se subieron correctamente', 'success');
        } catch (error) {
            Swal.fire('Error', 'No se pudieron subir las imágenes', 'error');
        } finally {
            setSubiendoImagen(false);
        }
    };

    // Eliminar una imagen del array
    const handleRemoveImage = (idx: number) => {
        setDetalleEditando({
            ...detalleEditando,
            imageUrls: detalleEditando.imageUrls.filter((_: string, i: number) => i !== idx)
        });
    };

    const handleEditarDetalle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!producto) return;
        try {
            await detalleSchema.validate({
                ...detalleEditando,
                purchasePrice: detalleEditando.prizeId?.purchasePrice,
                sellingPrice: detalleEditando.prizeId?.sellingPrice,
            }, { abortEarly: false });

            // Actualiza el precio primero
            await putPrice(detalleEditando.prizeId.id, {
                purchasePrice: detalleEditando.prizeId.purchasePrice,
                sellingPrice: detalleEditando.prizeId.sellingPrice
            });

            // Luego actualiza el detalle
            await putDetalle(detalleEditando.id, {
                ...detalleEditando,
                productIdj: { id: producto.id },
                sizeId: { id: Number(detalleEditando.sizeId?.id || detalleEditando.sizeId) },
                prizeId: { id: detalleEditando.prizeId.id },
                state: detalleEditando.state ?? true,
                imageUrls: detalleEditando.imageUrls || []
            });

            setMostrarFormDetalle && setMostrarFormDetalle(false);
            setDetalleEditando(null);
            const data = await getProductoPorId(producto.id);
            setProducto(data);
            Swal.fire('¡Éxito!', 'Detalle editado correctamente', 'success');
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                Swal.fire('Error de validación', error.errors.join('<br>'), 'error');
            } else {
                Swal.fire('Error', error?.message || 'Error desconocido', 'error');
            }
        }
    };

    return (
        <form className="detalle-producto-form" onSubmit={handleEditarDetalle}>
            <h4>Editar detalle</h4>
            <input
                name="colour"
                placeholder="Color"
                value={detalleEditando.colour || ''}
                onChange={e => setDetalleEditando({ ...detalleEditando, colour: e.target.value })}
                required
            />
            <select
                name="sizeId"
                value={detalleEditando.sizeId?.id || detalleEditando.sizeId || ''}
                onChange={e => setDetalleEditando({ ...detalleEditando, sizeId: e.target.value })}
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
                value={detalleEditando.stock || ''}
                onChange={e => setDetalleEditando({ ...detalleEditando, stock: e.target.value })}
                required
            />
            <input
                name="purchasePrice"
                type="number"
                placeholder="Valor compra"
                value={detalleEditando.prizeId?.purchasePrice || ''}
                onChange={e => setDetalleEditando({
                    ...detalleEditando,
                    prizeId: { ...detalleEditando.prizeId, purchasePrice: e.target.value }
                })}
                required
            />
            <input
                name="sellingPrice"
                type="number"
                placeholder="Valor venta"
                value={detalleEditando.prizeId?.sellingPrice || ''}
                onChange={e => setDetalleEditando({
                    ...detalleEditando,
                    prizeId: { ...detalleEditando.prizeId, sellingPrice: e.target.value }
                })}
                required
            />
            <select
                name="state"
                value={detalleEditando.state ?? true}
                onChange={e => setDetalleEditando({ ...detalleEditando, state: e.target.value === "true" })}
                required
            >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
            </select>
            <input
                name="brand"
                placeholder="Marca"
                value={detalleEditando.brand || ''}
                onChange={e => setDetalleEditando({ ...detalleEditando, brand: e.target.value })}
            />
            {/* Subida y previsualización de imágenes */}
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={subiendoImagen}
            />
            {subiendoImagen && <p>Subiendo imágenes...</p>}
            {detalleEditando.imageUrls && detalleEditando.imageUrls.length > 0 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    {detalleEditando.imageUrls.map((url: string, idx: number) => (
                        <div key={idx} style={{ position: 'relative' }}>
                            <img src={url} alt={`Vista previa ${idx + 1}`} style={{ maxWidth: 100 }} />
                            <button
                                type="button"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    background: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: 20,
                                    height: 20,
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleRemoveImage(idx)}
                                title="Eliminar imagen"
                            >×</button>
                        </div>
                    ))}
                </div>
            )}
            <button type="submit" disabled={subiendoImagen}>Guardar cambios</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};