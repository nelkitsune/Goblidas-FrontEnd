import React from 'react'
import imagenEjemplo from '../../img/descarga.jpg'
import { ItemCount } from '../ItemCount/ItemCount'
import './CardCarritoEstilo.css'
import { Detalle } from '../../../types/detalle'
import { useCarritoStore } from '../../../store/useCarritoStore'
import imgEj from '../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif';

type Props = {
    id: number
    nombre: string
    precio: number
    imagen_id: {
        url: string
    }
    cantidad: number
    detalle: Detalle
    talle: string | number
}

export const CardCarrito = ({ id, nombre, precio, imagen_id, cantidad, detalle, talle }: Props) => {
    const quitarProducto = useCarritoStore((state) => state.quitarProducto)

    const hanleDeleteProducto = () => {
        quitarProducto(id)
    }
    const cambiarCantidad = useCarritoStore((state) => state.cambiarCantidad)
    return (
        <div className="card">
            <div className='img'>
                <img src={imgEj} alt={nombre} />
            </div>
            <div className='nombre'>
                <p>{nombre}</p>
                <p>{talle}</p>
            </div>
            <div className='cantidad'>
                <ItemCount
                    stock={10}
                    initial={cantidad}
                    onAdd={() => { }}
                    detalle={detalle}
                    cosa={false}
                    onChangeCantidad={(nuevaCantidad) => cambiarCantidad(id, nuevaCantidad)}
                ></ItemCount>
            </div>
            <div className='precio'>
                <p>${precio.toLocaleString()}</p>
            </div>
            <div className='eliminar'>
                <i className="bi bi-trash" onClick={hanleDeleteProducto}></i>
            </div>
        </div>
    )
}
// <img src={imagen_id?.url || imagenEjemplo} alt={nombre} />