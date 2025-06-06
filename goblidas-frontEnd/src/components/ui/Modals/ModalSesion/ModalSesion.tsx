import React from 'react'
import { useUsuarioStore } from '../../../../store/useUsuarioStore'
import './ModalSesionEstilo.css'
import { Link } from 'react-router'

export const ModalSesion = ({
    onIniciarSesion,
    onRegistrarse
}: {
    onIniciarSesion: () => void,
    onRegistrarse: () => void
}) => {
    const usuario = useUsuarioStore((state) => state.usuario);

    return (
        <>
            {usuario && (
                <div className='modalSesionInterior'>
                    <div className='divModalSesion'>Hola, {usuario.name}</div>
                    <div className='divModalSesion'><Link to="/verperfil">Mi Perfil</Link></div>
                    <div className='divModalSesion'>Mis pedidos</div>
                    <div className='divModalSesion'>Salir</div>
                </div>
            )}
            {!usuario && (
                <div className='modalSesionInterior'>
                    <div className='divModalSesion' onClick={onIniciarSesion}>Iniciar sesión</div>
                    <div className='divModalSesion' onClick={onRegistrarse}>Registrarse</div>
                </div>
            )}
        </>
    )
}
