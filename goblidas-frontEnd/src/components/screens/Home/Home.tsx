import React from 'react'
import CarruselHome from '../../ui/CarruselHome/CarruselHome'
import CarruselCasero from '../../ui/CarruselCasero/CarruselCasero'
import { CardProducto } from '../../ui/CardProducto/CardProducto'
import { ContenedorDeProductos } from '../../ui/ContenedorDeProductos/ContenedorDeProductos'
import { RegistrarSesionModal } from '../../ui/Modals/RegistrarSesionModal/RegistrarSesionModal'

export const Home = () => {
    return (
        <>
            <CarruselCasero></CarruselCasero>
            <br />
            <h4>Zapatillas</h4>
            <ContenedorDeProductos />
            <h4>Ropa</h4>
            <ContenedorDeProductos />
        </>
    )
}
