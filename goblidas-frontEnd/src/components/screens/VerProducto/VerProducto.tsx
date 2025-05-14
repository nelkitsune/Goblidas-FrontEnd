import React from 'react'
import fotoEjemplo from '../../../components/img/descarga.jpg'
import './VerProductoEstilo.css'
import { ContenedorDeProductos } from '../../ui/ContenedorDeProductos/ContenedorDeProductos'
import { ItemCount } from '../../ui/ItemCount/ItemCount'

export const VerProducto = () => {
    return (
        <div className='VerProducto'>
            <div className='fotosVerProducto'>
                <img src={fotoEjemplo} alt="" className='ImagenPrincipalFotos' />
                <div className='ImagenesSecundarias'>
                    <img src={fotoEjemplo} alt="" /><img src={fotoEjemplo} alt="" /><img src={fotoEjemplo} alt="" /><img src={fotoEjemplo} alt="" /><img src={fotoEjemplo} alt="" />
                </div>
            </div>
            <div className='CuerpoVerProducto'>
                <h3>Nombre Producto</h3>
                <h4>Precio</h4>
                <ItemCount
                    stock={10}
                    initial={1}
                    onAdd={(quantity) => console.log(`Añadido ${quantity} productos al carrito`)}
                />
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
