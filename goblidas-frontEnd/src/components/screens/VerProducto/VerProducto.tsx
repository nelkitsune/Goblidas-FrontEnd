import React, { useEffect, useState } from 'react'
import fotoEjemplo from '../../../components/img/descarga.jpg'
import './VerProductoEstilo.css'
import { ContenedorDeProductos } from '../../ui/ContenedorDeProductos/ContenedorDeProductos'
import { ItemCount } from '../../ui/ItemCount/ItemCount'
import { useProductoStore } from '../../../store/useProductoStore';
import { Detalle } from '../../../types/detalle'
import imgEj from '../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif';


export const VerProducto = () => {
    const [detalle, setDetalle] = useState<Detalle | null>(null);
    useEffect(() => {
        const detalleActivo = useProductoStore.getState().detalleActivo;
        setDetalle(detalleActivo);
    }, []);



    return (
        <div className='VerProducto'>
            <div className='fotosVerProducto'>
                <img src={imgEj} alt="" className='ImagenPrincipalFotos' />
                <div className='ImagenesSecundarias'>
                    <img src={imgEj} alt="" /><img src={imgEj} alt="" /><img src={imgEj} alt="" /><img src={imgEj} alt="" /><img src={imgEj} alt="" />
                </div>
            </div>
            <div className='CuerpoVerProducto'>
                <h3>{detalle?.productIdj.name}</h3>
                <h4>{detalle?.prizeId.sellingPrice}</h4>
                {detalle && (
                    <ItemCount
                        stock={10}
                        initial={1}
                        onAdd={(quantity) => console.log(`Añadido ${quantity} productos al carrito`)}
                        detalle={detalle}
                        cosa={true}
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
//detalle?.imagen_id.url