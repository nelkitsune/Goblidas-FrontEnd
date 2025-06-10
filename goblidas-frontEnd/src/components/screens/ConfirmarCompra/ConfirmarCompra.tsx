import { useLocation } from 'react-router-dom';
import { Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';
import { createPaymentPreference } from '../../../service/paymentService';

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
                console.log('initPoint recibido:', initPoint);
                // Verifica si es solo el ID o una URL
                if (typeof initPoint === 'string' && initPoint.startsWith('http')) {
                    console.warn('¡initPoint es una URL! Debe ser solo el ID de preferencia.');
                } else {
                    console.log('preferenceId correcto:', initPoint);
                }
                setPreferenceId(initPoint); // initPoint debe ser SOLO el id, no la URL
            } catch (error) {
                console.error('Error al crear preferencia de pago:', error);
            }
        };
        fetchPreferenceId();
    }, [order]);
    return (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2>Confirmar Compra</h2>
            <h3>Dirección seleccionada</h3>
            {direccion ? (
                <div style={{ marginBottom: 20 }}>
                    <strong>
                        {direccion.streetName} {direccion.number}
                        {direccion.departament ? `, Dpto: ${direccion.departament}` : ""}
                    </strong>
                    <br />
                    {direccion.locality}, {direccion.province}, {direccion.country}
                </div>
            ) : (
                <p>No se seleccionó dirección.</p>
            )}

            <h3>Productos</h3>
            {typedCarrito.length > 0 ? (
                <ul>
                    {typedCarrito.map((item, idx) => (
                        <li key={idx}>
                            <strong>{item.nombre}</strong> x{item.cantidad} - ${item.precio}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}

            {preferenceId && (
                <div style={{ marginTop: 30 }}>
                    <Wallet initialization={{ preferenceId }} />
                </div>
            )}
        </div>
    );
};