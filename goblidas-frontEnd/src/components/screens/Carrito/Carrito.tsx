import React from 'react'
import { CardCarrito } from '../../ui/CardCarrito/CardCarrito'

export const Carrito = () => {
    return (
        <div>
            <h1>Carrito</h1>
            <div>
                <ul>
                    <li><CardCarrito /></li>
                    <li><CardCarrito /></li>
                    <li><CardCarrito /></li>
                    <li><CardCarrito /></li>
                </ul>
            </div>
            <div>
                <h2>Resumen</h2>
                <table>
                    <tbody>
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
                <div className="botones">
                    <button className="btn-pagar">Ir a pagar</button>
                    <button className="btn-seguir">Seguir comprando</button>
                </div>
            </div>
        </div>
    )
}
