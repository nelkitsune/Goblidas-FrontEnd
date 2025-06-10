import { useEffect, useState } from 'react';
import { getOrdersByUser } from '../../../service/orderService';
import { useUsuarioStore } from '../../../store/useUsuarioStore';

export const MisPedidos = () => {
    const usuario = useUsuarioStore(state => state.usuario);
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPedidos = async () => {
            if (!usuario?.id) return;
            try {
                const data = await getOrdersByUser(usuario.id);
                setPedidos(data);
            } catch (error) {
                console.error('Error al obtener pedidos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPedidos();
    }, [usuario]);

    if (loading) return <div>Cargando pedidos...</div>;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2>Mis Pedidos</h2>
            {pedidos.length === 0 ? (
                <p>No tienes pedidos realizados.</p>
            ) : (
                <ul>
                    {pedidos.map((pedido) => (
                        <li key={pedido.id} style={{ marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
                            <div><strong>Fecha:</strong> {pedido.date}</div>
                            <div><strong>Estado:</strong> {pedido.orderStatus}</div>
                            <div><strong>Total:</strong> ${pedido.summary}</div>
                            <div>
                                <strong>Productos:</strong>
                                <ul>
                                    {pedido.orderDetails?.map((detalle: any) => (
                                        <li key={detalle.id.detailId}>
                                            {detalle.detailId.productId?.name || 'Producto'} x{detalle.quantity} - ${detalle.unitPrice}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};