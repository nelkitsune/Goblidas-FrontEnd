import React, { useState } from 'react';
import './ItemCountEstilo.css';
import { useCarritoStore } from '../../../store/useCarritoStore'
import { Detalle } from '../../../types/detalle';

interface ItemCountProps {
    stock: number;
    initial: number;
    onAdd: (quantity: number) => void;
    detalle: Detalle;
}

export const ItemCount: React.FC<ItemCountProps> = ({ stock, initial, onAdd, detalle }) => {

    const agregarProducto = useCarritoStore((state) => state.agregarProducto);

    const [count, setCount] = useState(initial);

    const handleIncrement = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleAddToCart = (quantity: number) => {
        if (detalle) {
            const productoCarrito = {
                ...detalle,
                cantidad: quantity,
            };
            agregarProducto(productoCarrito);
        }
        onAdd(quantity);
    }


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
            <button className="add-to-cart" onClick={() => handleAddToCart(count)} disabled={stock === 0}>
                Añadir al carrito
            </button>
        </div>
    );
};