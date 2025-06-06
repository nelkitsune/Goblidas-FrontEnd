import React, { useState } from 'react'
import { CardProducto } from '../CardProducto/CardProducto'
import "./ContenedorDeProductosEstilos.css"
import { Detalle } from '../../../types/detalle'
import imgEj from "../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif"
import { Producto } from '../../../types/producto'
import { useDetalleStore } from '../../../store/useDetalleStore'

interface ContenedorDeProductosProps {
    productos: Producto[];
}

export const ContenedorDeProductos = ({ productos }: ContenedorDeProductosProps) => {
    const setDetalleActivo = useDetalleStore((state) => state.setDetalleActivo);

    const buscarPrecio = (producto: Producto): number => {
        if (!producto.details || producto.details.length === 0) return 0;
        const detalleActivo = producto.details.find((detalle) => detalle.state === true);
        setDetalleActivo(detalleActivo ?? null);
        return detalleActivo?.prizeId?.sellingPrice ?? 0;
    };
    return (
        <div className='contenedor-productos'>
            {productos.map((producto) => (
                <CardProducto
                    key={producto.id}
                    id={producto.id}
                    nombreProducto={producto.name}
                    precio={buscarPrecio(producto)}
                    img={imgEj}
                    producto={producto}
                />
            ))}
        </div>
    )
}



