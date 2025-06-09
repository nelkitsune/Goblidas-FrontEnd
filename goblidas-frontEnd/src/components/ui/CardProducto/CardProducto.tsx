import React from 'react'
import './CardProductoEstilo.css'
import fotomedias from "../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif";
import { Link } from 'react-router-dom';
import { Producto } from '../../../types/producto';
import { useProductoStore } from '../../../store/useProductoStore';



type Props = {
    id: number
    nombreProducto: string
    precio: number
    img?: string
    producto?: Producto
}


export const CardProducto = ({ nombreProducto, precio, img, id, producto }: Props) => {
    const handleClick = () => {
        if (producto) {
            setProductoActivo(producto);
            console.log("Producto encontrado:", producto);
        } else {
            console.log("Producto no encontrado");
        }
    }
    const productoActivo = useProductoStore((state) => state.productoActivo);
    const setProductoActivo = useProductoStore((state) => state.setProductoActivo);

    return (
        <>
            <Link to="/verproducto" className='CardProducto__link' onClick={handleClick}>
                <div className='CardProducto'>
                    <div className='CardProducto__img'>
                        <img src={img || fotomedias} alt="nombreProducto" />
                    </div>
                    <div className='CardProducto__info'>
                        <h6>{nombreProducto}</h6>
                        <p>${precio}</p>
                    </div>
                </div >
            </Link>
        </>
    )
}
