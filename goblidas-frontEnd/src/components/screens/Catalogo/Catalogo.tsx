import React, { useState } from 'react'
import { SideCatalogo } from '../../ui/SideCatalogo/SideCatalogo'
import './CatalogoEstilo.css'
import { MenuCategoria } from '../../ui/MenuCategoria/MenuCategoria'


export const Catalogo = () => {

    const [sideCatalogo, setSideCatalogo] = useState(false)

    const handleOpenSideCatalogo = () => {
        console.log(sideCatalogo)
        setSideCatalogo(!sideCatalogo)
    }
    return (
        <>
            <div className="Catalogo">
                <button onClick={handleOpenSideCatalogo} className="btnFiltros">
                    Categorias
                </button>
                {sideCatalogo && <SideCatalogo />}
                <h1>Catalogo</h1>
                <MenuCategoria />
            </div>
        </>
    )
}

