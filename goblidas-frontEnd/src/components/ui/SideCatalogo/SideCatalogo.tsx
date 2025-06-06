import React, { use, useEffect, useState } from 'react'
import "./SideCatalogo.css"
import { getCategory } from '../../../service/categoryService'
import { getSize } from '../../../service/sizeService';

export const SideCatalogo = ({ onFiltrar }: { onFiltrar: (filtros: any) => void }) => {
    const [Categorias, setCategorias] = useState([]);
    const [Talles, setTalles] = useState([]);
    useEffect(() => {

        getCategory()
            .then((data) => {
                console.log('🟢 [SideCatalogo] Categorías obtenidas:', data);
                setCategorias(data);
            }
            )
            .catch((error) => {
                console.error('🔴 [SideCatalogo] Error al obtener categorías:', error);
            });
        getSize()
            .then((data) => {
                console.log('🟢 [SideCatalogo] Talles obtenidos:', data);
                setTalles(data);
            })
            .catch((error) => {
                console.error('🔴 [SideCatalogo] Error al obtener talles:', error);
            });
    }
        , []);
    return (
        <>
            <div className="sideCatalogoTotal">
                <div>
                    <h2>Categorias</h2>
                </div>
                <div>
                    <ul>
                        {Categorias.map((categoria: any) => (
                            <li key={categoria.id}>
                                <button onClick={() => onFiltrar({ categoriesIds: categoria.id })}>
                                    {categoria.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Precio</h3>
                </div>
                <div>
                    <h3>Talle</h3>
                    <ul>
                        {Talles.map((talle: any) => (
                            <li key={talle.id}>
                                <button onClick={() => onFiltrar({ size: talle.number })}>
                                    {talle.number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
