import React from 'react'
import './CardProductoEstilo.css'
import fotomedias from "../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif";
import { Link } from 'react-router-dom';
import { Detalle } from '../../../types/detalle';
import { Producto } from '../../../types/producto';

import { useProductoStore } from '../../../store/useProductoStore';



type Props = {
    id: number
    nombreProducto: string
    precio: number
    img?: string
}


export const CardProducto = ({ nombreProducto, precio, img, id }: Props) => {
    const handleClick = () => {
        const detalle = useProductoStore.getState().detalles.find((detalle: Detalle) => detalle.id === id);
        if (detalle) {
            setDetalleActivo(detalle);
        }
        console.log(detalleActivo);
    }
    const detalleActivo = useProductoStore((state) => state.detalleActivo);
    const setDetalleActivo = useProductoStore((state) => state.setDetalleActivo);

    return (
        <>
            <div className='CardProducto'>
                <div className='CardProducto__img'>
                    <img src={img || fotomedias} alt="nombreProducto" />
                </div>
                <Link to="/verproducto" className='CardProducto__link' onClick={handleClick}>
                    <div className='CardProducto__info'>
                        <h6>{nombreProducto}</h6>
                        <p>${precio}</p>
                        <button>Ver Producto</button>
                    </div>
                </Link>
            </div>
        </>
    )
}
