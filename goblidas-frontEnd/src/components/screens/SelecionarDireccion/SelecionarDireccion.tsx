import React from 'react'
import { CardDireccion } from '../../ui/CardDireccion/CardDireccion'
import './SeleccionarDireccionEstilo.css'

export const SelecionarDireccion = () => {
    return (
        <div className='selecionarDireccionScreen'>
            <h1>Selecionar Dirección</h1>
            <div className='selecionarDireccionCuerpo'>
                <CardDireccion />
            </div>
            <div className='selecionarDireccionBotones'>
                <button className='botonSelecionarDireccion'>Agregar nueva direccion</button>
            </div>
        </div>
    )
}
