import React from 'react'
import { CardCarrito } from '../../ui/CardCarrito/CardCarrito'
import './CarritoEstilo.css'

export const Carrito = () => {
    return (
        <div className='carritoScreen'>
            <h1>Carrito</h1>
            <div className='carritoCuerpo'>
                <div className="listaProductos">
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><CardCarrito /></li>
                        <li><CardCarrito /></li>
                        <li><CardCarrito /></li>
                        <li><CardCarrito /></li>
                    </ul>
                </div>
                <div>
                    <div className='tamblaResumendepago'>
                        <h2>Resumen</h2>
                        <table>
                            <tbody style={{ fontSize: '1.2rem' }}>
                                <tr>
                                    <td>4 Productos</td>
                                    <td>$860.000</td>
                                </tr>
                                <tr>
                                    <td>Descuento (10%)</td>
                                    <td>-$45.000</td>
                                </tr>
                                <tr>
                                    <td>Entrega</td>
                                    <td>$6.000</td>
                                </tr>
                                <tr className="total">
                                    <td>Total</td>
                                    <td>$821.000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="botones">
                        <button className="btn-pagar">Ir a pagar</button>
                        <button className="btn-seguir">Seguir comprando</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
