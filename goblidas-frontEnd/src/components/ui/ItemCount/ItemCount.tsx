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
}

export const ItemCount: React.FC<ItemCountProps> = ({
    stock, initial, onAdd, detalle, cosa, onChangeCantidad, disabled, producto
}) => {

    const agregarProducto = useCarritoStore((state) => state.agregarProducto);

    const [count, setCount] = useState(initial);

    // Sincroniza el estado local con el valor de initial cuando cambie
    useEffect(() => {
        setCount(initial);
    }, [initial]);

    const handleIncrement = () => {
        if (count < stock) {
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
                const productoCarrito = {
                    ...detalle,
                    cantidad: quantity,
                    productIdj: producto, // <-- ahora sí
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
            console.error('Error al agregar al carrito:', error);
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
                <button onClick={handleIncrement} disabled={count >= stock}>
                    +
                </button>
            </div>
            {cosa && (
                <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(count)}
                    disabled={disabled || stock === 0} // <-- usa la prop aquí
                >
                    Añadir al carrito
                </button>
            )}
        </div>
    );
}