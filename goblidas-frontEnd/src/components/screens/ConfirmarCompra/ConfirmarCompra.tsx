import { useLocation } from 'react-router-dom';
import { Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';
import { createPaymentPreference } from '../../../service/paymentService';
import './ConfirmarCompraEstilo.css';

type CarritoItem = {
    nombre: string;
    cantidad: number;
    precio: number;
};

type Direccion = {
    streetName: string;
    number: number;
    locality: string;
    province: string;
    country: string;
    departament?: string;
};

export const ConfirmarCompra = () => {
    const location = useLocation();
    const { order, direccion, carrito } = location.state || {};
    const typedCarrito: CarritoItem[] = carrito || [];
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    useEffect(() => {
        const fetchPreferenceId = async () => {
            try {
                const initPoint = await createPaymentPreference(order.id);
                setPreferenceId(initPoint); // initPoint debe ser SOLO el id, no la URL
            } catch (error) {
                console.error('Error al crear preferencia de pago:', error);
            }
        };
        fetchPreferenceId();
    }, [order]);
    return (
        <div className="confirmar-compra-container">
            <h2 className="confirmar-compra-titulo">Confirmar Compra</h2>
            <h3 className="confirmar-compra-subtitulo">Dirección seleccionada</h3>
            {direccion ? (
                <div className="confirmar-compra-direccion" style={{ marginBottom: 20 }}>
                    <strong>
                        {direccion.streetName} {direccion.number}
                        {direccion.departament ? `, Dpto: ${direccion.departament}` : ""}
                    </strong>
                    <br />
                    {direccion.locality}, {direccion.province}, {direccion.country}
                </div>
            ) : (
                <p className="confirmar-compra-vacio">No se seleccionó dirección.</p>
            )}
            <h3 className="confirmar-compra-subtitulo">Productos</h3>
            {typedCarrito.length > 0 ? (
                <div className="confirmar-compra-productos">
                    <ul>
                        {typedCarrito.map((item, idx) => (
                            <li key={idx}>
                                <strong>{item.nombre}</strong> x{item.cantidad} - ${item.precio}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}
            {preferenceId && (
                <div className="confirmar-compra-wallet" style={{ marginTop: 30 }}>
                    <Wallet initialization={{ preferenceId }} />
                </div>
            )}
        </div>
    );
};