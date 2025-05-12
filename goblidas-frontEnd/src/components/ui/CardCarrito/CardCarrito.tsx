import React from 'react'
import imagenEjemplo from '../../img/descarga.jpg'
import { ItemCount } from '../ItemCount/ItemCount'
import './CardCarritoEstilo.css'

export const CardCarrito = () => {
    return (
        <div className="card">
            <div className='img'>
                <img src={imagenEjemplo} alt="Producto" />
            </div>
            <div className='nombre'>
                <p>Nombre del Producto</p>
                <p>Talle:41</p>
            </div>
            <div className='cantidad'>
                <p>-1+</p>
            </div>
            <div className='precio'>
                <p>$100.000</p>
            </div>
            <div className='eliminar'>
                <i className="bi bi-trash"></i>
            </div>
        </div>
    )
}
