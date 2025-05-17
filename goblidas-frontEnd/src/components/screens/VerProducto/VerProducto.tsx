import React, { useEffect, useState } from 'react'
import fotoEjemplo from '../../../components/img/descarga.jpg'
import './VerProductoEstilo.css'
import { ContenedorDeProductos } from '../../ui/ContenedorDeProductos/ContenedorDeProductos'
import { ItemCount } from '../../ui/ItemCount/ItemCount'
import { useProductoStore } from '../../../store/useProductoStore';
import { Detalle } from '../../../types/detalle'



export const VerProducto = () => {

    const [detalle, setDetalle] = useState<Detalle | null>(null);
    useEffect(() => {
        const detalleActivo = useProductoStore.getState().detalleActivo;
        setDetalle(detalleActivo);
    }, []);



    return (
        <div className='VerProducto'>
            <div className='fotosVerProducto'>
                <img src={detalle?.imagen_id.url} alt="" className='ImagenPrincipalFotos' />
                <div className='ImagenesSecundarias'>
                    <img src={detalle?.imagen_id.url} alt="" /><img src={detalle?.imagen_id.url} alt="" /><img src={detalle?.imagen_id.url} alt="" /><img src={detalle?.imagen_id.url} alt="" /><img src={detalle?.imagen_id.url} alt="" />
                </div>
            </div>
            <div className='CuerpoVerProducto'>
                <h3>{detalle?.producto_id.nombre}</h3>
                <h4>{detalle?.precio_id.precio_venta}</h4>
                {detalle && (
                    <ItemCount
                        stock={10}
                        initial={1}
                        onAdd={(quantity) => console.log(`Añadido ${quantity} productos al carrito`)}
                        detalle={detalle}
                    />
                )}
                <h3>Descripcion</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum reprehenderit porro quam aspernatur, libero eos odio? Fuga quam soluta nulla eligendi at provident fugit pariatur. Eum aliquid vitae id. Cum.</p>
            </div>
            <div className='ProductosRecomendados'>
                <h5>Productos recomendados</h5>
                <div className='ContenedorDeProductosRecomendados'>
                    <ContenedorDeProductos />
                </div>
            </div>
        </div>
    )
}
