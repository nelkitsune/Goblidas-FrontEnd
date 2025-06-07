import React from 'react'
import imagenEjemplo from '../../img/descarga.jpg'
import { ItemCount } from '../ItemCount/ItemCount'
import './CardCarritoEstilo.css'
import { Detalle } from '../../../types/detalle'
import { useCarritoStore } from '../../../store/useCarritoStore'
import imgEj from '../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif';
import Swal from 'sweetalert2'

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
    color?: string
}

export const CardCarrito = ({ id, nombre, precio, imagen_id, cantidad, detalle, talle, color }: Props) => {
    const quitarProducto = useCarritoStore((state) => state.quitarProducto)

    const handleDeleteProducto = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción eliminará el producto del carrito.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                quitarProducto(id);
                Swal.fire(
                    'Eliminado',
                    'El producto fue eliminado del carrito.',
                    'success'
                );
            }
        });
    };

    const cambiarCantidad = useCarritoStore((state) => state.cambiarCantidad)
    return (
        <div className="card">
            <div className='img'>
                <img src={imgEj} alt={nombre} />
            </div>
            <div className='nombre'>
                <p>{nombre}</p>
                <p>{talle} {color}</p>
            </div>
            <div className='cantidad'>
                <ItemCount
                    stock={detalle.stock}
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
                <i className="bi bi-trash" onClick={handleDeleteProducto}></i>
            </div>
        </div>
    )
}
// <img src={imagen_id?.url || imagenEjemplo} alt={nombre} />