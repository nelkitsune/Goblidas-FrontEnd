import React from 'react'
import { useUsuarioStore } from '../../../../store/useUsuarioStore'
import './ModalSesionEstilo.css'

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
                    <div className='divModalSesion'>Hola, {usuario.nombre}</div>
                    <div className='divModalSesion'>Mi cuenta</div>
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
