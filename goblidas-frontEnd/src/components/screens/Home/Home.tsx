import { useEffect, useState } from 'react'
import CarruselCasero from '../../ui/CarruselCasero/CarruselCasero'
import { ContenedorDeProductos } from '../../ui/ContenedorDeProductos/ContenedorDeProductos'
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
                // Filtra solo productos activos
                const activos = data.filter((p: Producto) => p.active !== false);
                setProducto(activos);
            })
            .catch((error) => {
                console.error("Error al obtener los Productos:", error);
            });
    }, []);

    useEffect(() => {
        if (!producto || producto.length === 0) return;
        setZapatilla(producto.filter((item) => item.productType === "Zapatilla"));
        setRemera(producto.filter((item) => item.productType === "Remera"));
        setPantalon(producto.filter((item) => item.productType === "Pantalon"));
        setGorra(producto.filter((item) => item.productType === "Gorra"));
        setAbrigo(producto.filter((item) => item.productType === "Abrigo"));
        setOtroTipo(producto.filter((item) =>
            !["Zapatilla", "Remera", "Pantalon", "Gorra", "Abrigo"].includes(item.productType)
        ));
    }, [producto]);

    if (!producto || producto.length === 0) {
        return <div>Cargando productos...</div>;
    }

    return (
        <>
            <CarruselCasero />
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
