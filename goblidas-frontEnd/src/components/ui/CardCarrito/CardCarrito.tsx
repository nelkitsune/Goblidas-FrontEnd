import React from 'react'
import imagenEjemplo from '../../img/descarga.jpg'
import { ItemCount } from '../ItemCount/ItemCount'
import './CardCarritoEstilo.css'
import { Detalle } from '../../../types/detalle'

type Props = {
    id: number
    nombre: string
    precio: number
    imagen_id: {
        url: string
    }
    cantidad: number
    detalle: Detalle
}

export const CardCarrito = ({ nombre, precio, imagen_id, cantidad,detalle}: Props) => {
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
                <p><ItemCount 
                stock={10}
                initial={cantidad}
                onAdd={() => {}}
                detalle={detalle}
                cosa={false}
                ></ItemCount></p>
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
