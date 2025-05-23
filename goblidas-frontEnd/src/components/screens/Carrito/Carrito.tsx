import React from 'react'
import { CardCarrito } from '../../ui/CardCarrito/CardCarrito'
import './CarritoEstilo.css'
import { useCarritoStore } from '../../../store/useCarritoStore'
import { Link } from 'react-router'


export const Carrito = () => {
    // Usar el hook para obtener los productos y que el componente se actualice automáticamente
    const productos = useCarritoStore((state) => state.productos)
    console.log('Productos en el carrito:', productos);
    return (
        <div className='carritoScreen'>
            <h1>Carrito</h1>
            <div className='carritoCuerpo'>
                <div className="listaProductos">
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {productos.map((producto) => (
                            <li key={producto.id}>
                                <CardCarrito
                                    id={producto.id}
                                    nombre={producto.producto_id.nombre}
                                    precio={producto.precio_id.precio_venta}
                                    imagen_id={{ url: producto.imagen_id.url }}
                                    cantidad={producto.cantidad}
                                    detalle={producto}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className='tamblaResumendepago'>
                        <h2>Resumen</h2>
                        <table>
                            <tbody style={{ fontSize: '1.2rem' }}>
                                {productos.map((producto) => (
                                    <tr key={producto.id + '-' + producto.cantidad}>
                                        <td>
                                            {producto.producto_id.nombre} x {producto.cantidad}
                                        </td>
                                        <td>
                                            ${(producto.precio_id.precio_venta * producto.cantidad).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                </tr>
                                <tr>
                                </tr>
                                <tr className="total" key={'total-' + productos.map(p => p.id + '-' + p.cantidad).join('_')}>
                                    <td>Total</td>
                                    <td>
                                        ${productos.reduce((total, producto) => total + (producto.precio_id.precio_venta * producto.cantidad), 0).toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="botones">
                        <button className="btn-pagar">Ir a pagar</button>
                        <button className="btn-seguir"><Link to="/catalogo">Seguir comprando</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
