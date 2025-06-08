import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoPorId } from '../../../../service/productsService';
import { postDetalle, putDetalle, deleteDetalle } from '../../../../service/detailService';
import { Producto } from '../../../../types/producto';
import './DetalleProductoEstilo.css';
import { AgregarDetalle } from './AgregarDetalle';
import { EditarDetalle } from './EditarDetalle';

export const DetalleProducto = () => {
    const { id } = useParams<{ id: string }>();
    const [producto, setProducto] = useState<Producto | null>(null);
    const [detalleEditando, setDetalleEditando] = useState<any | null>(null);
    const [mostrarFormDetalle, setMostrarFormDetalle] = useState(false);
    const [nuevoDetalle, setNuevoDetalle] = useState<any>({});

    useEffect(() => {
        const cargarProducto = async () => {
            if (!id) return;
            const data = await getProductoPorId(Number(id));
            setProducto(data);
        };
        cargarProducto();
    }, [id]);

    const handleAgregarDetalle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!producto) return;
        await postDetalle({ ...nuevoDetalle, productId: producto.id });
        setMostrarFormDetalle(false);
        setNuevoDetalle({});
        // Recargar producto para ver los detalles actualizados
        const data = await getProductoPorId(Number(id));
        setProducto(data);
    };

    const handleEditarDetalle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!detalleEditando) return;
        await putDetalle(detalleEditando.id, detalleEditando);
        setDetalleEditando(null);
        // Recargar producto
        const data = await getProductoPorId(Number(id));
        setProducto(data);
    };

    const handleEliminarDetalle = async (detalleId: number) => {
        if (!window.confirm('¿Eliminar este detalle?')) return;
        await deleteDetalle(detalleId);
        // Recargar producto
        const data = await getProductoPorId(Number(id));
        setProducto(data);
    };

    if (!producto) return <div className="detalle-producto-cargando">Cargando...</div>;

    return (
        <div className="detalle-producto-container">
            <h2 className="detalle-producto-titulo">Detalle del producto</h2>
            <div className="detalle-producto-info">
                <p><b>Nombre:</b> {producto.name}</p>
                <p><b>Tipo:</b> {producto.productType}</p>
                <p><b>Género:</b> {producto.gender}</p>
                <p><b>Categorías:</b> {producto.categoriesIds.map(cat => cat.name).join(', ')}</p>
            </div>

            <h3 className="detalle-producto-subtitulo">Detalles</h3>
            <button className="detalle-producto-agregar-btn" onClick={() => setMostrarFormDetalle(true)}>Agregar detalle</button>
            <table className="detalle-producto-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Color</th>
                        <th>Talle</th>
                        <th>Valor compra</th>
                        <th>Valor venta</th>
                        <th>stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {producto.details.map((detalle: any) => {
                        console.log(detalle); // <-- Aquí verás cada detalle en la consola
                        return (
                            <tr key={detalle.id}>
                                <td>{detalle.id}</td>
                                <td>{detalle.colour}</td>
                                <td>{detalle.sizeId.number}</td>
                                <td>{detalle.prizeId.purchasePrice}</td>
                                <td>{detalle.prizeId.sellingPrice}</td>
                                <td>{detalle.stock}</td>
                                <td>
                                    <button className="detalle-producto-editar-btn" onClick={() => setDetalleEditando(detalle)}>Editar</button>
                                    <button className="detalle-producto-eliminar-btn" onClick={() => handleEliminarDetalle(detalle.id)}>Eliminar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {mostrarFormDetalle && (
                <AgregarDetalle
                    nuevoDetalle={nuevoDetalle}
                    setNuevoDetalle={setNuevoDetalle}
                    producto={producto} // <-- asegúrate de pasar esto
                    setProducto={setProducto}
                    setMostrarFormDetalle={setMostrarFormDetalle}
                    getProductoPorId={getProductoPorId}
                    postDetalle={postDetalle}
                    onCancel={() => setMostrarFormDetalle(false)}
                />
            )}

            {detalleEditando && (
                <EditarDetalle
                    detalleEditando={detalleEditando}
                    setDetalleEditando={setDetalleEditando}
                    producto={producto}
                    setProducto={setProducto}
                    setMostrarFormDetalle={setMostrarFormDetalle}
                    getProductoPorId={getProductoPorId}
                    onCancel={() => setDetalleEditando(null)}
                />
            )}

            <div className="detalle-producto-volver">
                <Link to="/admin/productos">Volver</Link>
            </div>
        </div>
    );
};