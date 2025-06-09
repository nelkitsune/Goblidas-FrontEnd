import React from 'react'
import { useUsuarioStore } from '../../../../store/useUsuarioStore'
import './ModalSesionEstilo.css'
import { Link } from 'react-router'

interface ModalSesionProps {
    onIniciarSesion: () => void,
    onRegistrarse: () => void,
    onClose: () => void,
    visible: boolean
}

export const ModalSesion = ({
    onIniciarSesion,
    onRegistrarse,
    onClose,
    visible
}: ModalSesionProps) => {
    const usuario = useUsuarioStore((state) => state.usuario);
    const cerrarSesion = () => {
        onClose(); // Cierra el modal primero
        setTimeout(() => {
            useUsuarioStore.getState().logout();
        }, 0); // Espera al siguiente tick para evitar conflictos de render
    };

    if (!visible) return null;

    // Evita que el click dentro del modal cierre el modal
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="modalSesionOverlay" onClick={onClose}>
            <div
                className={`modalSesionInterior ${usuario ? 'modalSesionInterior-logueado' : 'modalSesionInterior-noLogueado'}`}
                onClick={handleModalClick}
            >
                {usuario ? (
                    <>
                        <div className='divModalSesion'>Hola, {usuario.name}</div>
                        <div className='divModalSesion'><Link to="/verperfil">Mi Perfil</Link></div>
                        <div className='divModalSesion'>Mis pedidos</div>
                        <div className='divModalSesion' onClick={cerrarSesion}>Salir</div>
                    </>
                ) : (
                    <>
                        <div className='divModalSesion' onClick={onIniciarSesion}>Iniciar sesión</div>
                        <div className='divModalSesion' onClick={onRegistrarse}>Registrarse</div>
                    </>
                )}
            </div>
        </div>
    )
}
