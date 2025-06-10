//inicio importaciones
import React, { useEffect, useState } from 'react'
import "./SideCatalogo.css"
import { getCategory } from '../../../service/categoryService'
import { getSize } from '../../../service/sizeService';
import { useNavigate } from 'react-router-dom';
//fin importaciones


export const SideCatalogo = ({
    onClose
}: {
    onClose: () => void
}) => {

    //seteo de usesStates
    const [Categorias, setCategorias] = useState([]);
    const [Talles, setTalles] = useState([]);
    const [tipoProducto, setTipoProducto] = useState('');
    const [sexo, setSexo] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [talleSeleccionado, setTalleSeleccionado] = useState('');
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const navigate = useNavigate();

    // Efecto para cargar categorías y talles al montar el componente
    useEffect(() => {
        getCategory()
            .then((data) => setCategorias(data))
            .catch((error) => console.error(error));
        getSize()
            .then((data) => {
                setTalles(data);
            })
            .catch((error) => console.error(error));
    }
        , []);

    // Función para manejar el filtrado de productos
    const handleFiltrar = () => {
        const filtros: any = {};
        if (categoriaSeleccionada) filtros.categoriesIds = categoriaSeleccionada;
        if (tipoProducto) filtros.productType = tipoProducto;
        if (sexo) filtros.gender = sexo;
        if (talleSeleccionado) filtros.sizeId = talleSeleccionado;
        if (precioMin) filtros.min = precioMin;
        if (precioMax) filtros.max = precioMax;

        const params = new URLSearchParams();
        Object.entries(filtros).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value as string);
            }
        });

        navigate(`/catalogo?${params.toString()}`);
        onClose();
    };

    // Definición de tipos de producto
    const tiposProducto = [
        { value: '', label: 'Tipo de producto' },
        { value: 'Zapatilla', label: 'Zapatilla' },
        { value: 'Remera', label: 'Remera' },
        { value: 'Pantalon', label: 'Pantalón' },
        { value: 'Gorra', label: 'Gorra' },
        { value: 'Abrigo', label: 'Abrigo' },
        { value: 'Otro Producto', label: 'Otro Producto' }
    ];

    return (
        <div className="sideCatalogoTotal">
            <div>
                <h2>Categorías</h2>
                <div className="btn-group">
                    <button
                        className={categoriaSeleccionada === '' ? 'active' : ''}
                        onClick={() => setCategoriaSeleccionada('')}
                    >
                        Todas
                    </button>
                    {Categorias.map((categoria: any) => (
                        <button
                            key={categoria.id}
                            className={categoriaSeleccionada === categoria.id ? 'active' : ''}
                            onClick={() => setCategoriaSeleccionada(categoria.id)}
                        >
                            {categoria.name}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3>Tipo de producto</h3>
                <div className="btn-group">
                    {tiposProducto.map(tipo => (
                        <button
                            key={tipo.value}
                            className={tipoProducto === tipo.value ? 'active' : ''}
                            onClick={() => setTipoProducto(tipo.value)}
                        >
                            {tipo.label}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3>Sexo</h3>
                <div className="btn-group">
                    <button
                        className={sexo === '' ? 'active' : ''}
                        onClick={() => setSexo('')}
                    >
                        Todos
                    </button>
                    <button
                        className={sexo === 'Masculino' ? 'active' : ''}
                        onClick={() => setSexo('Masculino')}
                    >
                        Masculino
                    </button>
                    <button
                        className={sexo === 'Femenino' ? 'active' : ''}
                        onClick={() => setSexo('Femenino')}
                    >
                        Femenino
                    </button>
                    <button
                        className={sexo === 'Unisex' ? 'active' : ''}
                        onClick={() => setSexo('Unisex')}
                    >
                        Unisex
                    </button>
                </div>
            </div>
            <div>
                <h3>Talle</h3>
                <div className="btn-group">
                    <button
                        className={talleSeleccionado === '' ? 'active' : ''}
                        onClick={() => setTalleSeleccionado('')}
                    >
                        Todos
                    </button>
                    {Talles.map((talle: any) => (
                        <button
                            key={talle.id}
                            className={talleSeleccionado === talle.id ? 'active' : ''}
                            onClick={() => setTalleSeleccionado(talle.id)}
                        >
                            {talle.number}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3>Precio</h3>
                <div className="precio-group">
                    <input
                        type="number"
                        placeholder="Mínimo"
                        value={precioMin}
                        onChange={e => setPrecioMin(e.target.value)}
                        min={0}
                    />
                    <input
                        type="number"
                        placeholder="Máximo"
                        value={precioMax}
                        onChange={e => setPrecioMax(e.target.value)}
                        min={0}
                    />
                </div>
            </div>
            <button onClick={handleFiltrar}>Filtrar</button>
        </div>
    );
}
