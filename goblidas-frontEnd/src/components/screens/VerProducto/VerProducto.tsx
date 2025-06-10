import React, { useState } from 'react'
import imgEj from '../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif';
import { useDetalleStore } from '../../../store/useDetalleStore';
import { useProductoStore } from '../../../store/useProductoStore'
import { ItemCount } from '../../ui/ItemCount/ItemCount'
import './VerProductoEstilo.css'
import { getDiscountPrice, getDescuentos } from '../../../service/discountprice';

// Mapea nombres a colores CSS válidos
const colorMap: Record<string, string> = {
    'rojo': 'red',
    'azul': 'blue',
    'verde': 'green',
    'verde lima': '#BFFF00',
    'amarillo': 'yellow',
    'negro': 'black',
    'blanco': 'white',
    'gris': 'gray',
    'gris claro': '#D3D3D3',
    'gris oscuro': '#555',
    'naranja': 'orange',
    'celeste': '#00BFFF',
    'violeta': 'violet',
    'morado': '#800080',
    'rosa': 'pink',
    'fucsia': '#FF00FF',
    'marrón': '#8B4513',
    'beige': '#F5F5DC',
    'bordó': '#800000',
    'turquesa': '#40E0D0',
    'dorado': '#FFD700',
    'plateado': '#C0C0C0',
    'azul marino': '#001F3F',
    'verde oscuro': '#006400',
    'verde claro': '#90EE90',
    'mostaza': '#FFDB58',
    'salmon': '#FA8072',
    'coral': '#FF7F50',
    'lavanda': '#E6E6FA',
    'cian': '#00FFFF',
    'lila': '#C8A2C8',
    'ocre': '#CC7722',
    // Agrega más según tus necesidades
};

export const VerProducto = () => {
    const detalleActivo = useDetalleStore((state) => state.detalleActivo);
    const setDetalleActivo = useDetalleStore((state) => state.setDetalleActivo);
    const productoActivo = useProductoStore((state) => state.productoActivo);

    // Estados para selección
    const [colorSeleccionado, setColorSeleccionado] = useState<string | null>(null);
    const [talleSeleccionado, setTalleSeleccionado] = useState<number | null>(null);
    const [precioConDescuento, setPrecioConDescuento] = useState<number | null>(null);
    const [porcentajeDescuento, setPorcentajeDescuento] = useState<number | null>(null);

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

    // Buscar descuento cuando cambia el detalleActivo
    React.useEffect(() => {
        const fetchDescuento = async () => {
            if (detalleActivo) {
                try {
                    console.log('Detalle activo:', detalleActivo);
                    // Trae todas las relaciones descuento-detalle
                    const discountPrices = await getDiscountPrice();
                    console.log('Relaciones descuento-precio:', discountPrices);

                    // Busca si el detalleActivo tiene descuento
                    const relacion = discountPrices.find(
                        (dp: any) => dp.priceId?.id === detalleActivo.prizeId.id
                    );
                    console.log('Relación encontrada:', relacion);

                    if (relacion) {
                        // Trae todos los descuentos
                        const descuentos = await getDescuentos();
                        console.log('Descuentos:', descuentos);

                        // Busca el descuento correspondiente
                        const descuento = descuentos.find((d: any) => d.id === relacion.discountId.id);
                        console.log('Descuento encontrado:', descuento);

                        if (descuento) {
                            const precioOriginal = detalleActivo.prizeId.sellingPrice;
                            const precioFinal = precioOriginal - (precioOriginal * descuento.percentage / 100);
                            setPrecioConDescuento(precioFinal);
                            setPorcentajeDescuento(descuento.porcentaje);
                            console.log('Precio original:', precioOriginal, 'Precio con descuento:', precioFinal);
                            return;
                        }
                    }
                    setPrecioConDescuento(null);
                    setPorcentajeDescuento(null);
                } catch (e) {
                    console.log('Error buscando descuento:', e);
                    setPrecioConDescuento(null);
                    setPorcentajeDescuento(null);
                }
            } else {
                setPrecioConDescuento(null);
                setPorcentajeDescuento(null);
            }
        };
        fetchDescuento();
    }, [detalleActivo]);

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
                <h4>
                    {precioConDescuento ? (
                        <>
                            <span style={{ textDecoration: 'line-through', color: 'red', marginRight: 8 }}>
                                ${detalleActivo?.prizeId.sellingPrice}
                            </span>
                            <span style={{ color: 'green', fontWeight: 'bold', marginRight: 8 }}>
                                ${precioConDescuento.toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <>${detalleActivo?.prizeId.sellingPrice}</>
                    )}
                </h4>
                {productoActivo && detalleActivo && (
                    <ItemCount
                        stock={detalleActivo.stock}
                        initial={1}
                        onAdd={(quantity) => console.log(`Añadido ${quantity} productos al carrito`)}
                        detalle={detalleActivo}
                        cosa={true}
                        disabled={!puedeAgregar}
                        producto={productoActivo}
                        precioConDescuento={precioConDescuento} // <-- NUEVO
                    />
                )}
                <h4 className='verProductoColores'>Color:
                    {coloresUnicos.map((color) => {
                        const cssColor = colorMap[color.toLowerCase()] || color;
                        const isLight = ['amarillo', 'blanco', 'verde lima'].includes(color.toLowerCase());
                        return (
                            <button
                                key={color}
                                className={`ColorBtn${colorSeleccionado === color ? ' ColorBtn-activo' : ''}`}
                                onClick={() => {
                                    setColorSeleccionado(color);
                                    setTalleSeleccionado(null);
                                }}
                                style={{
                                    backgroundColor: cssColor,
                                    color: isLight ? '#222' : '#fff',
                                }}
                            >
                                {color}
                            </button>
                        )
                    })}
                </h4>
                <h4 className='verProductoTamanioBoton'>Tamaño:
                    {tallesFiltrados.map((talle) => (
                        <button
                            key={talle}
                            className={`TalleBtn${talleSeleccionado === talle ? ' TalleBtn-activo' : ''}`}
                            onClick={() => setTalleSeleccionado(talle)}
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