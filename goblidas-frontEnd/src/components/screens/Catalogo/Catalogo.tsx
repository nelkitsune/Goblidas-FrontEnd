import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SideCatalogo } from '../../ui/SideCatalogo/SideCatalogo'
import './CatalogoEstilo.css'
import { MenuCategoria } from '../../ui/MenuCategoria/MenuCategoria'
import { filtrarProductos, getProductos } from '../../../service/productsService'
import { Producto } from '../../../types/producto'

export const Catalogo = () => {
    const [sideCatalogo, setSideCatalogo] = useState(false)
    const [productos, setProductos] = useState<any[]>([]);
    interface Filtros {
        size?: string;
        [key: string]: any;
    }
    const [filtros, setFiltros] = useState<Filtros>({});
    const location = useLocation();

    // Lee los parámetros de la URL y los convierte en un objeto
    const getFiltrosFromURL = () => {
        const params = new URLSearchParams(location.search);
        const filtrosURL: any = {};
        params.forEach((value, key) => {
            filtrosURL[key] = value;
        });
        return filtrosURL;
    };

    useEffect(() => {
        const filtrosURL = getFiltrosFromURL();
        // Si hay filtros en la URL, usa el endpoint de filtro
        if (Object.keys(filtrosURL).length > 0) {
            filtrarProductos(filtrosURL).then((data) => {
                setProductos(Array.isArray(data) ? data.filter((p: any) => p.active !== false) : []);
            });
        } else {
            // Si no hay filtros, trae todos los productos
            getProductos().then((data) => {
                setProductos(data.filter((p: any) => p.active !== false));
            });
        }
    }, [location.search]);

    // Llama a este método cuando cambie algún filtro interno
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

    // Filtrado adicional por talle (si hay un talle seleccionado)
    const productosFiltrados = productos.filter((producto: Producto) => {
        // Si no hay talle seleccionado, no filtra por talle
        if (!filtros.size || filtros.size === '') return true;
        // Busca si algún detalle coincide con el talle (por id) y está activo
        return producto.details.some(
            (detalle) =>
                detalle.sizeId.id === Number(filtros.size) && // <-- compara por id
                detalle.active !== false &&
                detalle.state !== false
        );
    });

    // Abre el SideCatalogo
    const handleOpenSideCatalogo = () => {
        setSideCatalogo((prev) => !prev);
    };

    return (
        <>
            <div className="Catalogo">
                <button onClick={handleOpenSideCatalogo} className="btnFiltros">
                    Categorias
                </button>
                {sideCatalogo && (
                    <SideCatalogo onClose={() => setSideCatalogo(false)} />
                )}
                <h1>Catalogo</h1>
                <MenuCategoria productos={productosFiltrados} />
                <div className="productosCatalogo">
                    {productosFiltrados.length === 0 && <p>No hay productos para este filtro.</p>}
                </div>
            </div>
        </>
    )
}

