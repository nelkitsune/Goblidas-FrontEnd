import React, { useEffect, useState } from 'react'
import './CardProductoEstilo.css'
import fotomedias from "../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif";
import { Link } from 'react-router-dom';
import { Producto } from '../../../types/producto';
import { useProductoStore } from '../../../store/useProductoStore';
import { getImagesByDetail } from '../../../service/cloudinaryService';
import { useDetalleStore } from '../../../store/useDetalleStore';



type Props = {
    id: number
    nombreProducto: string
    precio: number
    img?: string
    producto?: Producto
}


export const CardProducto = ({ nombreProducto, precio, img, id, producto }: Props) => {
    const setProductoActivo = useProductoStore((state) => state.setProductoActivo);
    const setDetalleActivo = useDetalleStore((state) => state.setDetalleActivo);
    const [imgUrl, setImgUrl] = useState<string | undefined>(img);

    useEffect(() => {
        const fetchImg = async () => {
            if (!img && producto && producto.details && producto.details.length > 0) {
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

    const handleClick = () => {
        if (producto) {
            setProductoActivo(producto);
            // Selecciona el primer detalle disponible
            const primerDetalle = producto.details?.find((detalle) => detalle.state === true) || producto.details?.[0] || null;
            setDetalleActivo(primerDetalle ?? null);
        }
    };

    return (
        <>
            <Link to="/verproducto" className='CardProducto__link' onClick={handleClick}>
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
