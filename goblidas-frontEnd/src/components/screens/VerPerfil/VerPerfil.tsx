import { useEffect, useState } from 'react'
import { useUsuarioStore } from '../../../store/useUsuarioStore'
import { Usuario } from '../../../types/usuario'
import { getAdressByUser } from '../../../service/adressService'
import { Direccion } from '../../../types/direccion'
import './VerPerfilEstilo.css'

export const VerPerfil = () => {
    const [usuario, setUsuario] = useState<Usuario>()
    const [direcciones, setDirecciones] = useState<Direccion[]>([])

    useEffect(() => {
        const usuarioActivo = useUsuarioStore.getState().usuario
        setUsuario(usuarioActivo === null ? undefined : usuarioActivo)

        if (usuarioActivo?.id) {
            getAdressByUser(usuarioActivo.id).then(data => {
                const direccionesUsuario = data.map((item: any) => ({
                    id: item.adressId.id,
                    departament: item.adressId.departament,
                    locality: item.adressId.locality,
                    country: item.adressId.country,
                    province: item.adressId.province,
                    number: item.adressId.number,
                    streetName: item.adressId.streetName,
                }))
                setDirecciones(direccionesUsuario)
            })
        }
    }, [])

    return (
        <>
            <div className='VerPerfil'>
                <h2>Perfil de Usuario</h2>
                <div className='perfilInfo'>
                    <p><strong>Nombre:</strong> {usuario?.name}</p>
                    <p><strong>Email:</strong> {usuario?.email} </p>
                </div>
                <h2>Direcciones</h2>
                <ul>
                    {direcciones.length === 0 && <li>No hay direcciones registradas.</li>}
                    {direcciones.map(dir => (
                        <li key={dir.id}>
                            {dir.streetName} {dir.number}, {dir.locality}, {dir.province}, {dir.country}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
