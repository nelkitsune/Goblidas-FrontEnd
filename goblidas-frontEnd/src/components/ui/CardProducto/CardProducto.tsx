import React from 'react'
import './CardProductoEstilo.css'
import fotomedias from "../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif";

export const CardProducto = () => {
    return (
        <>
            <div className='CardProducto'>
                <div className='CardProducto__img'>
                    <img src={fotomedias} alt="" />
                </div>
                <div className='CardProducto__info'>
                    <h6>Nombre del producto</h6>
                    <p>$ 1000</p>
                    <button>Agregar al carrito</button>
                </div>
            </div>
        </>
    )
}
