import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoPorId } from '../../../../service/productsService';
import { postDetalle, putDetalle, deleteDetalle } from '../../../../service/detailService';
import { getDescuentos, postDiscountPriceByProductId, getDiscountByProductId } from '../../../../service/discountprice';
import { Producto } from '../../../../types/producto';
import './DetalleProductoEstilo.css';
import { AgregarDetalle } from './AgregarDetalle';
import { EditarDetalle } from './EditarDetalle';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const detalleSchema = Yup.object().shape({
    colour: Yup.string().required('El color es obligatorio'),
    sizeId: Yup.string().required('El talle es obligatorio'),
    stock: Yup.number().typeError('El stock debe ser un número').required('El stock es obligatorio').min(0, 'El stock no puede ser negativo'),
    purchasePrice: Yup.number().typeError('El valor de compra debe ser un número').required('El valor de compra es obligatorio').min(0, 'No puede ser negativo'),
    sellingPrice: Yup.number().typeError('El valor de venta debe ser un número').required('El valor de venta es obligatorio').min(0, 'No puede ser negativo'),
    brand: Yup.string().nullable(),
});

export const DetalleProducto = () => {
    const { id } = useParams<{ id: string }>();
    const [producto, setProducto] = useState<Producto | null>(null);
    const [detalleEditando, setDetalleEditando] = useState<any | null>(null);
    const [mostrarFormDetalle, setMostrarFormDetalle] = useState(false);
    const [nuevoDetalle, setNuevoDetalle] = useState<any>({});
    const [mostrarModalDescuento, setMostrarModalDescuento] = useState(false);
    const [precioIdSeleccionado, setPrecioIdSeleccionado] = useState<number | null>(null);
    const [descuentosDisponibles, setDescuentosDisponibles] = useState<any[]>([]);
    const [descuentoSeleccionado, setDescuentoSeleccionado] = useState<number | null>(null);
    const [descuentosPorPrecio, setDescuentosPorPrecio] = useState<{ [key: number]: any[] }>({});

    useEffect(() => {
        const cargarProducto = async () => {
            if (!id) return;
            const data = await getProductoPorId(Number(id));
            setProducto(data);
        };
        cargarProducto();
    }, [id]);

    useEffect(() => {
        const cargarDescuentosPorPrecio = async () => {
            if (!producto) return;
            const descuentosMap: { [key: number]: any[] } = {};
            await Promise.all(
                producto.details.map(async (detalle: any) => {
                    const descuentos = await getDiscountByProductId(detalle.prizeId.id);
                    descuentosMap[detalle.prizeId.id] = descuentos;
                })
            );
            setDescuentosPorPrecio(descuentosMap);
        };
        cargarDescuentosPorPrecio();
    }, [producto]);

    const handleAgregarDetalle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!producto) return;
        try {
            await detalleSchema.validate(nuevoDetalle, { abortEarly: false });
            await postDetalle({ ...nuevoDetalle, productId: producto.id });
            setMostrarFormDetalle(false);
            setNuevoDetalle({});
            // Recargar producto para ver los detalles actualizados
            const data = await getProductoPorId(Number(id));
            setProducto(data);
            Swal.fire('¡Éxito!', 'Detalle agregado correctamente', 'success');
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                Swal.fire('Error de validación', error.errors.join('<br>'), 'error');
            } else {
                Swal.fire('Error', error?.message || 'Error desconocido', 'error');
            }
        }
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
        const result = await Swal.fire({
            title: '¿Eliminar este detalle?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        if (!result.isConfirmed) return;
        // Eliminado lógico usando DELETE (el backend debe marcar active: false)
        await deleteDetalle(detalleId);
        // Recargar producto
        const data = await getProductoPorId(Number(id));
        setProducto(data);
        Swal.fire('Eliminado', 'Detalle eliminado correctamente', 'success');
    };

    const handleAbrirModalDescuento = async (precioId: number) => {
        setPrecioIdSeleccionado(precioId);
        const descuentos = await getDescuentos();
        setDescuentosDisponibles(descuentos);
        console.log("mostrarModalDescuento:", mostrarModalDescuento);
        setMostrarModalDescuento(true);
        console.log('Descuentos disponibles:', descuentos);
        console.log("mostrarModalDescuento:", mostrarModalDescuento);
    };

    const handleAsignarDescuento = async () => {
        console.log('Asignando descuento...', precioIdSeleccionado, descuentoSeleccionado);
        if (!precioIdSeleccionado || !descuentoSeleccionado) return;
        await postDiscountPriceByProductId({
            discountId: descuentoSeleccionado,
            priceId: precioIdSeleccionado,
            active: true
        });
        setMostrarModalDescuento(false);
        setDescuentoSeleccionado(null);
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
            <div className="detalle-producto-table-wrapper">
                <table className="detalle-producto-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Color</th>
                            <th>Talle</th>
                            <th>Valor compra</th>
                            <th>Valor venta</th>
                            <th>stock</th>
                            <th>Descuento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {producto.details
                            .filter((detalle: any) => detalle.active !== false)
                            .map((detalle: any) => (
                                <tr key={detalle.id}>
                                    <td>{detalle.id}</td>
                                    <td>{detalle.colour}</td>
                                    <td>{detalle.sizeId.number}</td>
                                    <td>{detalle.prizeId.purchasePrice}</td>
                                    <td>{detalle.prizeId.sellingPrice}</td>
                                    <td>{detalle.stock}</td>
                                    <td>
                                        {descuentosPorPrecio[detalle.prizeId.id] && descuentosPorPrecio[detalle.prizeId.id].length > 0
                                            ? `${descuentosPorPrecio[detalle.prizeId.id][0].discountId.percentage}%`
                                            : 'Sin descuento'}
                                    </td>
                                    <td>
                                        <button
                                            className="detalle-producto-descuento-btn"
                                            onClick={() => handleAbrirModalDescuento(detalle.prizeId.id)}
                                        >
                                            Agregar descuento
                                        </button>
                                        <button className="detalle-producto-editar-btn" onClick={() => setDetalleEditando(detalle)}>Editar</button>
                                        <button className="detalle-producto-eliminar-btn" onClick={() => handleEliminarDetalle(detalle.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

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

            {mostrarModalDescuento && (
                <div
                    className="modal"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            background: '#fff',
                            padding: 24,
                            borderRadius: 8,
                            minWidth: 320,
                            maxWidth: 400,
                            boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
                        }}
                    >
                        <h4>Selecciona un descuento</h4>
                        <select
                            value={descuentoSeleccionado ?? ''}
                            onChange={e => {
                                const value = e.target.value;
                                setDescuentoSeleccionado(value ? Number(value) : null);
                            }}
                            style={{ width: '100%', marginBottom: 12, padding: 6 }}
                        >
                            <option value="">-- Selecciona --</option>
                            {descuentosDisponibles.map((desc: any) => (
                                <option key={desc.id} value={desc.id}>
                                    {desc.percentage}% - {desc.initialDate} a {desc.finalDate}
                                </option>
                            ))}
                        </select>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={async () => {
                                    if (!precioIdSeleccionado || !descuentoSeleccionado) return;
                                    await postDiscountPriceByProductId({
                                        discountId: descuentoSeleccionado,
                                        priceId: precioIdSeleccionado,
                                        active: true
                                    });
                                    setMostrarModalDescuento(false);
                                    setDescuentoSeleccionado(null);
                                    // Recargar producto para ver el descuento aplicado
                                    const data = await getProductoPorId(Number(id));
                                    setProducto(data);
                                }}
                                disabled={descuentoSeleccionado === null}
                                style={{
                                    background: '#ff9800',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '6px 16px',
                                    borderRadius: 4,
                                    cursor: descuentoSeleccionado === null ? 'not-allowed' : 'pointer',
                                    marginRight: 8,
                                }}
                            >
                                Asignar
                            </button>
                            <button
                                onClick={() => {
                                    setMostrarModalDescuento(false);
                                    setDescuentoSeleccionado(null);
                                }}
                                style={{
                                    background: '#eee',
                                    color: '#333',
                                    border: 'none',
                                    padding: '6px 16px',
                                    borderRadius: 4,
                                    cursor: 'pointer',
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="detalle-producto-volver">
                <Link to="/admin/productos">Volver</Link>
            </div>
        </div>
    );
};