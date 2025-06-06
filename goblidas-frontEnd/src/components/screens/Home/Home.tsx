import React, { useEffect, useState } from 'react'
import { Detalle } from '../../../types/detalle'
import CarruselHome from '../../ui/CarruselHome/CarruselHome'
import CarruselCasero from '../../ui/CarruselCasero/CarruselCasero'
import { CardProducto } from '../../ui/CardProducto/CardProducto'
import { ContenedorDeProductos } from '../../ui/ContenedorDeProductos/ContenedorDeProductos'
import { RegistrarSesionModal } from '../../ui/Modals/RegistrarSesionModal/RegistrarSesionModal'
import { getDetalles } from '../../../service/detailService'
import { getProductos } from '../../../service/productsService'
import { Producto } from '../../../types/producto'

export const Home = () => {
    const [producto, setProducto] = useState<Producto[]>([])
    const [zapatilla, setZapatilla] = useState<Producto[]>([])
    const [remera, setRemera] = useState<Producto[]>([])
    const [pantalon, setPantalon] = useState<Producto[]>([])
    const [gorra, setGorra] = useState<Producto[]>([])
    const [abrigo, setAbrigo] = useState<Producto[]>([])
    const [otroTipo, setOtroTipo] = useState<Producto[]>([])

    useEffect(() => {
        getProductos()
            .then((data) => {
                setProducto(data);
                console.log("Productos obtenidos:", data);
            })
            .catch((error) => {
                console.error("Error al obtener los Productos:", error);
            });
    }, []);

    useEffect(() => {
        const zapatilla = producto.filter((item) => item.productType === "Zapatilla");
        const remera = producto.filter((item) => item.productType === "Remera");
        const pantalon = producto.filter((item) => item.productType === "Pantalon");
        const gorra = producto.filter((item) => item.productType === "Gorra");
        const abrigo = producto.filter((item) => item.productType === "Abrigo");
        const otroTipo = producto.filter((item) =>
            !["Zapatilla", "Remera", "Pantalon", "Gorra", "Abrigo"].includes(item.productType)
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
            <ContenedorDeProductos productos={zapatilla} />
            <h4>Remeras</h4>
            <ContenedorDeProductos productos={remera} />
            <h4>Pantalones</h4>
            <ContenedorDeProductos productos={pantalon} />
            <h4>Gorras</h4>
            <ContenedorDeProductos productos={gorra} />
            <h4>Abrigos</h4>
            <ContenedorDeProductos productos={abrigo} />
            <h4>Otros productos</h4>
            <ContenedorDeProductos productos={otroTipo} />
        </>
    )
}
