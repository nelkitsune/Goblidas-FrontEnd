import React, { useEffect, useState } from 'react';
import { getSize } from '../../../../service/sizeService';
import { putDetalle } from '../../../../service/detailService';
import { putPrice } from '../../../../service/priceService';

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

    useEffect(() => {
        const fetchSizes = async () => {
            const data = await getSize();
            setSizes(data);
        };
        fetchSizes();
    }, []);

    const handleEditarDetalle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!producto) return;

        try {
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
                state: detalleEditando.state ?? true // por defecto true si no se elige
            });

            setMostrarFormDetalle && setMostrarFormDetalle(false);
            setDetalleEditando(null);
            const data = await getProductoPorId(producto.id);
            setProducto(data);
        } catch (error) {
            console.error('Error al editar detalle:', error);
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
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};