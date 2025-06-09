import React, { useEffect, useState } from 'react'
import { SideCatalogo } from '../../ui/SideCatalogo/SideCatalogo'
import './CatalogoEstilo.css'
import { MenuCategoria } from '../../ui/MenuCategoria/MenuCategoria'
import { filtrarProductos, getProductos } from '../../../service/productsService'

export const Catalogo = () => {
    const [sideCatalogo, setSideCatalogo] = useState(false)
    const [productos, setProductos] = useState<any[]>([]);
    const [filtros, setFiltros] = useState({});

    const handleOpenSideCatalogo = () => {
        setSideCatalogo(!sideCatalogo)
    }

    // Si no hay filtros, trae todos los productos
    useEffect(() => {
        if (Object.keys(filtros).length === 0) {
            getProductos().then((data) => {
                setProductos(data.filter((p: any) => p.active !== false));
            });
        }
        console.log('🟢 [Catalogo] Filtros actuales:', filtros);
    }, [filtros]);

    // Llama a este método cuando cambie algún filtro
    const handleFiltrar = async (nuevosFiltros: any) => {
        const filtrosActualizados = { ...filtros, ...nuevosFiltros };
        setFiltros(filtrosActualizados);

        if (Object.keys(filtrosActualizados).length === 0) {
            const todos = await getProductos();
            setProductos(todos.filter((p: any) => p.active !== false));
            return;
        }

        const productosFiltrados = await filtrarProductos(filtrosActualizados);
        let filtrados: any[] = [];
        if (Array.isArray(productosFiltrados)) {
            filtrados = productosFiltrados;
        } else if (productosFiltrados && Array.isArray(productosFiltrados.data)) {
            filtrados = productosFiltrados.data;
        } else if (productosFiltrados) {
            filtrados = [productosFiltrados];
        }
        setProductos(filtrados.filter((p: any) => p.active !== false));
    }

    console.log('Productos a renderizar:', productos);

    return (
        <>
            <div className="Catalogo">
                <button onClick={handleOpenSideCatalogo} className="btnFiltros">
                    Categorias
                </button>
                {sideCatalogo && (
                    <SideCatalogo onFiltrar={handleFiltrar} />
                )}
                <h1>Catalogo</h1>
                <MenuCategoria productos={productos} />
                <div className="productosCatalogo">
                    {productos.length === 0 && <p>No hay productos para este filtro.</p>}
                </div>
            </div>
        </>
    )
}

