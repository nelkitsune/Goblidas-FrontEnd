import React from 'react'
import { CardProducto } from '../CardProducto/CardProducto'
import "./ContenedorDeProductosEstilos.css"
import { Detalle } from '../../../types/detalle'
import imgEj from "../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif"

interface ContenedorDeProductosProps {
    detalles: Detalle[];
}

export const ContenedorDeProductos = ({ detalles }: ContenedorDeProductosProps) => {


    return (
        <div className='contenedor-productos'>
            {detalles.map((detalle) => (
                <CardProducto
                    key={detalle.id}
                    id={detalle.id}
                    nombreProducto={detalle.productIdj.name}
                    precio={detalle.prizeId.sellingPrice}
                    img={imgEj}
                />
            ))}
        </div>
    )
}



