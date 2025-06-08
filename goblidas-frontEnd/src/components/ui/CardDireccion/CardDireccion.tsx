import React from 'react'
import './CardDireccionEstilo.css'

type Props = {
    id: number
    departament: string
    locality: string
    country: string
    province: string
    number: string | number
    streetName: string
}

export const CardDireccion = ({
    id,
    departament,
    locality,
    country,
    province,
    number,
    streetName
}: Props) => {
    return (
        <div className='cardDireccion'>
            <p><strong>{streetName}</strong></p>
            <p>Número: {number}</p>
            <p>Departamento: {departament}</p>
            <p>Localidad: {locality}</p>
            <p>Provincia: {province}</p>
            <p>País: {country}</p>
        </div>
    )
}
