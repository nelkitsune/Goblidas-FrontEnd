import React, { useState, useEffect } from 'react';
import './ItemCountEstilo.css';
import { useCarritoStore } from '../../../store/useCarritoStore'
import { Detalle } from '../../../types/detalle';
import { Producto } from '../../../types/producto';
import Swal from 'sweetalert2'

interface ItemCountProps {
    stock: number;
    initial: number;
    onAdd: (quantity: number) => void;
    detalle: Detalle;
    cosa?: boolean;
    onChangeCantidad?: (cantidad: number) => void;
    disabled?: boolean;
    producto?: Producto;
    precioConDescuento?: number | null; // <-- NUEVO
}

export const ItemCount: React.FC<ItemCountProps> = ({
    stock, initial, onAdd, detalle, cosa, onChangeCantidad, disabled, producto, precioConDescuento
}) => {
    const agregarProducto = useCarritoStore((state) => state.agregarProducto);

    const [count, setCount] = useState(initial);

    // Obtener cuántos ya hay en el carrito de este producto
    const carrito = useCarritoStore.getState().productos;
    const yaEnCarrito = carrito.find(p => p.id === detalle.id)?.cantidad || 0;
    const maxParaAgregar = stock - yaEnCarrito;

    useEffect(() => {
        setCount(initial);
    }, [initial, stock, yaEnCarrito]);

    const handleIncrement = () => {
        // Solo permite sumar si no superas el stock total
        if (count < maxParaAgregar) {
            setCount(count + 1);
            if (onChangeCantidad) onChangeCantidad(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
            if (onChangeCantidad) onChangeCantidad(count - 1);
        }
    };

    const handleAddToCart = (quantity: number) => {
        try {
            if (detalle && producto) {
                // Verifica cuántos ya hay en el carrito
                const carrito = useCarritoStore.getState().productos;
                const yaEnCarrito = carrito.find(p => p.id === detalle.id)?.cantidad || 0;
                if (yaEnCarrito + quantity > detalle.stock) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Stock insuficiente',
                        text: `Ya tienes ${yaEnCarrito} en el carrito. Solo puedes agregar ${detalle.stock - yaEnCarrito} más.`,
                    });
                    return;
                }
                const productoCarrito = {
                    ...detalle,
                    cantidad: quantity,
                    productIdj: producto,
                    prizeId: {
                        ...detalle.prizeId,
                        sellingPrice: precioConDescuento ?? detalle.prizeId.sellingPrice // <-- usa el precio con descuento si existe
                    }
                };
                agregarProducto(productoCarrito);
            }
            onAdd(quantity);
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                text: `Se han agregado ${quantity} unidades al carrito.`,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo agregar el producto al carrito. Inténtalo de nuevo más tarde.',
            });
        }
    };

    return (
        <div className="item-count">
            <div className="controls">
                <button onClick={handleDecrement} disabled={count <= 1}>
                    -
                </button>
                <span>{count}</span>
                <button
                    onClick={handleIncrement}
                    disabled={count >= maxParaAgregar}
                >
                    +
                </button>
            </div>
            {cosa && (
                <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(count)}
                    disabled={disabled || stock === 0 || count > maxParaAgregar || maxParaAgregar <= 0}
                >
                    Añadir al carrito
                </button>
            )}
        </div>
    );
}