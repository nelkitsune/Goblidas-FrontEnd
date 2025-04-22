import React from 'react'
import { CardProducto } from '../CardProducto/CardProducto'
import "./ContenedorDeProductosEstilos.css"

export const ContenedorDeProductos = () => {


    return (
        <div className='contenedor-productos'>
            <CardProducto />
            <CardProducto />
            <CardProducto />
            <CardProducto />
            <CardProducto />
            <CardProducto />
            <CardProducto />
        </div>
    )
}



