// src/components/PagoMercadoPago.tsx
import React from 'react';
import axios from 'axios';

type Props = {
    productos: any[];
    direccionId: number;
};

export const PagoMercadoPago: React.FC<Props> = ({ productos, direccionId }) => {
    const handlePagar = async () => {
        try {
            // Debug: mostrar datos antes de enviar
            console.log('Enviando a MercadoPago:', {
                items: productos.map(p => ({
                    title: p.productIdj?.name || p.nombre || 'Producto',
                    quantity: p.cantidad,
                    unit_price: p.prizeId?.sellingPrice || p.unit_price,
                    currency_id: 'ARS'
                })),
                direccionId
            });

            const response = await axios.post('http://localhost:8080/api/mercadopago/create-preference', {
                items: productos.map(p => ({
                    title: p.productIdj?.name || p.nombre || 'Producto',
                    quantity: p.cantidad,
                    unit_price: p.prizeId?.sellingPrice || p.unit_price,
                    currency_id: 'ARS'
                })),
                direccionId
            });

            const { init_point } = response.data;
            window.location.href = init_point;
        } catch (error: any) {
            // Mostrar mensaje de error del backend si existe
            if (error.response) {
                const backendMsg = error.response.data?.message || JSON.stringify(error.response.data) || error.response.statusText;
                alert(`Error MercadoPago: ${error.response.status} - ${backendMsg}\n¿El backend requiere autenticación o headers especiales?`);
                console.error('Respuesta del backend:', error.response);
            } else {
                alert('Error de red o desconocido al crear preferencia de Mercado Pago');
            }
            console.error('Error al crear preferencia de Mercado Pago:', error);
        }
    };

    return (
        <button onClick={handlePagar}>
            Pagar con Mercado Pago
        </button>
    );
};
