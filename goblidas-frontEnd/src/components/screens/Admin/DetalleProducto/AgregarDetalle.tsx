import React, { useEffect, useState } from 'react';
import { getSize } from '../../../../service/sizeService';
import { postPrice } from '../../../../service/priceService';
import { Precio } from '../../../../types/precio';

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

    useEffect(() => {
        const fetchSizes = async () => {
            const data = await getSize();
            setSizes(data);
        };
        fetchSizes();
    }, []);
    const [precioId, setprecioId] = useState<Precio | null>(null)
    const handleAgregarDetalle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!producto) return;

        try {
            // Espera a que se cree el precio y obtén la respuesta
            const price = await postPrice({
                purchasePrice: nuevoDetalle.purchasePrice,
                sellingPrice: nuevoDetalle.sellingPrice
            });

            // Ahora usa la id del precio creado para el detalle
            await postDetalle({
                ...nuevoDetalle,
                productIdj: { id: producto.id },
                sizeId: { id: Number(nuevoDetalle.sizeId) },
                prizeId: { id: price.id },
                state: nuevoDetalle.state ?? true // por defecto true si no se elige
            });

            setMostrarFormDetalle(false);
            setNuevoDetalle({});
            const data = await getProductoPorId(producto.id);
            setProducto(data);
        } catch (error) {
            console.error('Error al agregar detalle:', error);
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
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

