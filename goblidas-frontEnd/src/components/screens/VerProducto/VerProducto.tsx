import React, { useState } from 'react'
import imgEj from '../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif';
import { useDetalleStore } from '../../../store/useDetalleStore';
import { useProductoStore } from '../../../store/useProductoStore'
import { ItemCount } from '../../ui/ItemCount/ItemCount'
import './VerProductoEstilo.css'

export const VerProducto = () => {
    const detalleActivo = useDetalleStore((state) => state.detalleActivo);
    const setDetalleActivo = useDetalleStore((state) => state.setDetalleActivo);
    const productoActivo = useProductoStore((state) => state.productoActivo);

    // Estados para selección
    const [colorSeleccionado, setColorSeleccionado] = useState<string | null>(null);
    const [talleSeleccionado, setTalleSeleccionado] = useState<number | null>(null);

    // Colores únicos
    const coloresUnicos = productoActivo
        ? Array.from(new Set(productoActivo.details.map((detalle) => detalle.colour)))
        : [];

    // Talles únicos según el color seleccionado
    const tallesFiltrados = productoActivo && colorSeleccionado
        ? Array.from(
            new Set(
                productoActivo.details
                    .filter((detalle) => detalle.colour === colorSeleccionado)
                    .map((detalle) => detalle.sizeId.number)
            )
        )
        : [];

    // Actualizar detalleActivo cuando ambos estén seleccionados
    React.useEffect(() => {
        if (productoActivo && colorSeleccionado && talleSeleccionado) {
            const detalle = productoActivo.details.find(
                (d) => d.colour === colorSeleccionado && d.sizeId.number === talleSeleccionado
            );
            setDetalleActivo(detalle ?? null);
        }
    }, [productoActivo, colorSeleccionado, talleSeleccionado, setDetalleActivo]);

    // Setear automáticamente el primer detalle disponible al abrir el producto
    React.useEffect(() => {
        if (productoActivo && productoActivo.details.length > 0) {
            const primerDetalle = productoActivo.details[0];
            setColorSeleccionado(primerDetalle.colour);
            setTalleSeleccionado(primerDetalle.sizeId.number);
            setDetalleActivo(primerDetalle);
        }
    }, [productoActivo, setDetalleActivo]);

    console.log(detalleActivo?.prizeId.sellingPrice)
    console.log(productoActivo?.details)
    console.log(detalleActivo)
    // Deshabilitar añadir al carrito si falta selección
    const puedeAgregar = !!(colorSeleccionado && talleSeleccionado && detalleActivo);

    return (
        <div className='VerProducto'>
            <div className='fotosVerProducto'>
                <img src={imgEj} alt="" className='ImagenPrincipalFotos' />
                <div className='ImagenesSecundarias'>
                    <img src={imgEj} alt="" /><img src={imgEj} alt="" /><img src={imgEj} alt="" /><img src={imgEj} alt="" /><img src={imgEj} alt="" />
                </div>
            </div>
            <div className='CuerpoVerProducto'>
                <h3>{productoActivo?.name}</h3>
                <h4>{detalleActivo?.prizeId.sellingPrice}</h4>
                {productoActivo && detalleActivo && (
                    <ItemCount
                        stock={detalleActivo.stock}
                        initial={1}
                        onAdd={(quantity) => console.log(`Añadido ${quantity} productos al carrito`)}
                        detalle={detalleActivo}
                        cosa={true}
                        disabled={!puedeAgregar}
                        producto={productoActivo} // <-- pásalo aquí
                    />
                )}
                <h4>Color:
                    {coloresUnicos.map((color) => (
                        <button
                            key={color}
                            onClick={() => {
                                setColorSeleccionado(color);
                                setTalleSeleccionado(null); // Reinicia talle al cambiar color
                            }}
                            style={{
                                fontWeight: colorSeleccionado === color ? 'bold' : 'normal'
                            }}
                        >
                            {color}
                        </button>
                    ))}
                </h4>
                <h4>Tamaño:
                    {tallesFiltrados.map((talle) => (
                        <button
                            key={talle}
                            onClick={() => setTalleSeleccionado(talle)}
                            style={{
                                fontWeight: talleSeleccionado === talle ? 'bold' : 'normal'
                            }}
                        >
                            {talle}
                        </button>
                    ))}
                </h4>
                {!puedeAgregar && (
                    <div style={{ color: 'red' }}>
                        Selecciona un color y un talle para añadir al carrito.
                    </div>
                )}
            </div>
            <div className='ProductosRecomendados'>
                <h5>Productos recomendados</h5>
                <div className='ContenedorDeProductosRecomendados'>
                </div>
            </div>
        </div>
    )
}