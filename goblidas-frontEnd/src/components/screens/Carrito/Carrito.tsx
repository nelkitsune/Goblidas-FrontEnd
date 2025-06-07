import React from 'react'
import { CardCarrito } from '../../ui/CardCarrito/CardCarrito'
import './CarritoEstilo.css'
import { useCarritoStore } from '../../../store/useCarritoStore'
import { Link } from 'react-router-dom'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

initMercadoPago('YOUR_PUBLIC_KEY');

export const Carrito = () => {
    // Usar el hook para obtener los productos y que el componente se actualice automáticamente
    const detalles = useCarritoStore((state) => state.productos)
    console.log('Productos en el carrito:', detalles);

    return (
        <div className='carritoScreen'>
            <h1>Carrito</h1>
            <div className='carritoCuerpo'>
                <div className="listaProductos">
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {detalles.map(detalle => (
                            <li key={detalle.id}>
                                <CardCarrito
                                    id={detalle.id}
                                    nombre={detalle.productIdj.name}
                                    precio={detalle.prizeId.sellingPrice}
                                    imagen_id={{ url: "2" }} //arreglar
                                    cantidad={detalle.cantidad}
                                    detalle={detalle}
                                    talle={detalle.sizeId.number} //arreglar.... creo
                                    color={detalle.colour}
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
                                {detalles.map(producto => (
                                    <tr key={producto.id + '-' + producto.cantidad}>
                                        <td>
                                            {producto.productIdj.name} x {producto.cantidad}
                                        </td>
                                        <td>
                                            ${(producto.prizeId.sellingPrice * producto.cantidad).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="total" key={'total-' + detalles.map(p => p.id + '-' + p.cantidad).join('_')}>
                                    <td>Total</td>
                                    <td>
                                        ${detalles.reduce((total, producto) => total + (producto.prizeId.sellingPrice * producto.cantidad), 0).toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="botones">
                        <button className="btn-pagar">Ir a pagar</button>
                        <button className="btn-seguir"><Link to="/catalogo">Seguir comprando</Link></button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                        <h1>Botón de Pago</h1>
                        <p>Haz clic en el botón para realizar el pago.</p>
                        {/* Renderiza el botón de pago */}
                        <div style={{ width: '300px' }}>
                            <Wallet initialization={{ preferenceId: 'TEST-5526674981794431-060517-4ce4e1a53f659e8c6068c09202013ec8-2109126111' }} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
