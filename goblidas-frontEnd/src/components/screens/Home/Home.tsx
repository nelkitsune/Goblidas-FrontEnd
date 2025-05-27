import React, { useEffect, useState } from 'react'
import { Detalle } from '../../../types/detalle'
import CarruselHome from '../../ui/CarruselHome/CarruselHome'
import CarruselCasero from '../../ui/CarruselCasero/CarruselCasero'
import { CardProducto } from '../../ui/CardProducto/CardProducto'
import { ContenedorDeProductos } from '../../ui/ContenedorDeProductos/ContenedorDeProductos'
import { RegistrarSesionModal } from '../../ui/Modals/RegistrarSesionModal/RegistrarSesionModal'
import { getDetalles } from '../../../service/detailService'

export const Home = () => {
    const [producto, setProducto] = useState<Detalle[]>([])
    const [zapatilla, setZapatilla] = useState<Detalle[]>([])
    const [remera, setRemera] = useState<Detalle[]>([])
    const [pantalon, setPantalon] = useState<Detalle[]>([])
    const [gorra, setGorra] = useState<Detalle[]>([])
    const [abrigo, setAbrigo] = useState<Detalle[]>([])
    const [otroTipo, setOtroTipo] = useState<Detalle[]>([])

    useEffect(() => {
        getDetalles()
            .then((data) => {
                setProducto(data);
                console.log("Detalles obtenidos:", data);
            })
            .catch((error) => {
                console.error("Error al obtener los detalles:", error);
            });
    }, []);

    useEffect(() => {
        const zapatilla = producto.filter((item) => item.productIdj.productType === "Zapatilla");
        const remera = producto.filter((item) => item.productIdj.productType === "Remera");
        const pantalon = producto.filter((item) => item.productIdj.productType === "Pantalon");
        const gorra = producto.filter((item) => item.productIdj.productType === "Gorra");
        const abrigo = producto.filter((item) => item.productIdj.productType === "Abrigo");
        const otroTipo = producto.filter((item) =>
            !["Zapatilla", "Remera", "Pantalon", "Gorra", "Abrigo"].includes(item.productIdj.productType)
        );
        setZapatilla(zapatilla);
        setRemera(remera);
        setPantalon(pantalon);
        setGorra(gorra);
        setAbrigo(abrigo);
        setOtroTipo(otroTipo);
        console.log("Zapatillas:", zapatilla);
        console.log("Remeras:", remera);
        console.log("Pantalones:", pantalon);
        console.log("Gorras:", gorra);
        console.log("Abrigos:", abrigo);
        console.log("Otros tipos:", otroTipo);
    }, [producto]);

    return (
        <>
            <CarruselCasero></CarruselCasero>
            <br />
            <h4>Zapatillas</h4>
            <ContenedorDeProductos detalles={zapatilla} />
            <h4>Remeras</h4>
            <ContenedorDeProductos detalles={remera} />
            <h4>Pantalones</h4>
            <ContenedorDeProductos detalles={pantalon} />
            <h4>Gorras</h4>
            <ContenedorDeProductos detalles={gorra} />
            <h4>Abrigos</h4>
            <ContenedorDeProductos detalles={abrigo} />
            <h4>Otros productos</h4>
            <ContenedorDeProductos detalles={otroTipo} />
        </>
    )
}
