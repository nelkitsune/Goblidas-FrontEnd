import React from 'react'
import imagenEjemplo from '../../img/descarga.jpg'
import { ItemCount } from '../ItemCount/ItemCount'
import './CardCarritoEstilo.css'

type Props = {
    id: number
    nombre: string
    precio: number
    imagen_id: {
        url: string
    }
    cantidad: number
}

export const CardCarrito = ({ nombre, precio, imagen_id, cantidad }: Props) => {
    return (
        <div className="card">
            <div className='img'>
                <img src={imagen_id?.url || imagenEjemplo} alt={nombre} />
            </div>
            <div className='nombre'>
                <p>{nombre}</p>
                <p>Talle:41</p>
            </div>
            <div className='cantidad'>
                <p>{cantidad}</p>
            </div>
            <div className='precio'>
                <p>${precio.toLocaleString()}</p>
            </div>
            <div className='eliminar'>
                <i className="bi bi-trash"></i>
            </div>
        </div>
    )
}
