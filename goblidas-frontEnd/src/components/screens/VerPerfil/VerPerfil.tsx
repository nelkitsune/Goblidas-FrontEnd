import React, { use, useEffect, useState } from 'react'
import { useUsuarioStore } from '../../../store/useUsuarioStore'
import { Usuario } from '../../../types/usuario';

export const VerPerfil = () => {
    const [usuario, setUsuario] = useState<Usuario>();
    useEffect(() => {
        const usuarioActivo = useUsuarioStore.getState().usuario;
        console.log(usuarioActivo);
        setUsuario(usuarioActivo === null ? undefined : usuarioActivo);
    }, []);
    return (
        <>
            <div className='VerPerfil'>
                <h2>Perfil de Usuario</h2>
                <div className='perfilInfo'>
                    <p><strong>Nombre:</strong> {usuario?.name}</p>
                    <p><strong>Email:</strong> {usuario?.email} </p>
                </div>
                <h2>Direcciones</h2>
            </div>
        </>
    )
}
