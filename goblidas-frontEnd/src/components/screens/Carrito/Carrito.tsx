import { CardCarrito } from '../../ui/CardCarrito/CardCarrito'
import './CarritoEstilo.css'
import { useCarritoStore } from '../../../store/useCarritoStore'
import { Link } from 'react-router-dom'
import { initMercadoPago } from '@mercadopago/sdk-react';
import { useEffect } from 'react';
import { getDetalles } from '../../../service/detailService'; // importa tu servicio

initMercadoPago('YOUR_PUBLIC_KEY');

export const Carrito = () => {
    const detalles = useCarritoStore((state) => state.productos);
    const cambiarCantidad = useCarritoStore((state) => state.cambiarCantidad);

    // Actualiza el stock de los productos del carrito al entrar al carrito
    useEffect(() => {
        const actualizarStock = async () => {
            try {
                const detallesActualizados = await getDetalles();
                detalles.forEach(productoCarrito => {
                    const detalleActual = detallesActualizados.find((d: any) => d.id === productoCarrito.id);
                    if (detalleActual) {
                        // Si el stock cambió y la cantidad es mayor al nuevo stock, ajusta la cantidad
                        if (productoCarrito.cantidad > detalleActual.stock) {
                            cambiarCantidad(productoCarrito.id, detalleActual.stock);
                        }
                        // Aquí podrías actualizar más campos si lo necesitas
                    }
                });
            } catch (e) {
                // Manejo de error opcional
            }
        };
        actualizarStock();
    }, []); // Solo al montar el componente

    // Comprobación de stock
    const hayExcesoDeStock = detalles.some(detalle => detalle.cantidad > detalle.stock);

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
                                    talle={detalle.sizeId.number} //arreglar.... creo... segun esto no funca pero si funca
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
                        <button
                            className="btn-pagar"
                            disabled={hayExcesoDeStock}
                            style={hayExcesoDeStock ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                        >
                            <Link
                                to={hayExcesoDeStock ? "#" : "/seleccionar-direccion"}
                                style={{ pointerEvents: hayExcesoDeStock ? "none" : "auto", color: "inherit", textDecoration: "none" }}
                            >
                                Selecionar direccion
                            </Link>
                        </button>
                        <button className="btn-seguir">
                            <Link to="/catalogo">Seguir comprando</Link>
                        </button>
                    </div>
                    {hayExcesoDeStock && (
                        <div style={{ color: 'red', marginTop: 10 }}>
                            Hay productos en el carrito que superan el stock disponible. Ajusta las cantidades antes de continuar.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
