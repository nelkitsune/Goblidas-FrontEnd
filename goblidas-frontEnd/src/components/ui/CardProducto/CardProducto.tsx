import React, { useEffect, useState } from 'react'
import './CardProductoEstilo.css'
import fotomedias from "../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif";
import { Link } from 'react-router-dom';
import { Producto } from '../../../types/producto';
import { useProductoStore } from '../../../store/useProductoStore';
import { getImagesByDetail } from '../../../service/cloudinaryService';



type Props = {
    id: number
    nombreProducto: string
    precio: number
    img?: string
    producto?: Producto
}


export const CardProducto = ({ nombreProducto, precio, img, id, producto }: Props) => {
    const productoActivo = useProductoStore((state) => state.productoActivo);
    const setProductoActivo = useProductoStore((state) => state.setProductoActivo);
    const [imgUrl, setImgUrl] = useState<string | undefined>(img);

    useEffect(() => {
        const fetchImg = async () => {
            if (!img && producto && producto.details && producto.details.length > 0) {
                // Busca el detalle activo (el mismo que para el precio)
                const detalleActivo = producto.details.find((detalle) => detalle.state === true);
                if (detalleActivo) {
                    const imagenes = await getImagesByDetail(detalleActivo.id);
                    if (imagenes && imagenes.length > 0) {
                        setImgUrl(imagenes[0].url);
                        return;
                    }
                }
            }
            setImgUrl(img);
        };
        fetchImg();
    }, [img, producto]);

    return (
        <>
            <Link to="/verproducto" className='CardProducto__link'>
                <div className='CardProducto'>
                    <div className='CardProducto__img'>
                        <img src={imgUrl || fotomedias} alt="nombreProducto" />
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
