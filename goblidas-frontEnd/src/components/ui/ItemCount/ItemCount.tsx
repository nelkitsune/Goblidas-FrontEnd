import React, { useState } from 'react';
import './ItemCountEstilo.css';
interface ItemCountProps {
    stock: number; // Cantidad máxima disponible
    initial: number; // Cantidad inicial
    onAdd: (quantity: number) => void; // Función para manejar la cantidad añadida
}

export const ItemCount: React.FC<ItemCountProps> = ({ stock, initial, onAdd }) => {
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

    const handleAddToCart = () => {
        onAdd(count);
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
            <button className="add-to-cart" onClick={handleAddToCart} disabled={stock === 0}>
                Añadir al carrito
            </button>
        </div>
    );
};