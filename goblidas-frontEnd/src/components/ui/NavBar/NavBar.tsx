import React, { useState } from 'react'
import './NavBarEstilo.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import fotoLogo from "../../img/goblinLogo.png"
import { Link } from 'react-router-dom';
import { ModalSesion } from '../Modals/ModalSesion/ModalSesion';
import { IniciarSesionModal } from '../Modals/IniciarSesionModal/IniciarSesionModal';
import { RegistrarSesionModal } from '../Modals/RegistrarSesionModal/RegistrarSesionModal';

export const NavBar = () => {
    const [modalSesion, setModalSesion] = useState(false);
    const [modalIniciarSesion, setModalIniciarSesion] = useState(false);
    const [modalRegistrarse, setModalRegistrarse] = useState(false);

    const handleModalSesion = () => {
        setModalSesion(!modalSesion);
    }

    const handleAbrirIniciarSesion = () => {
        setModalSesion(false);
        setModalIniciarSesion(true);
    }

    const handleAbrirRegistrarse = () => {
        setModalSesion(false);
        setModalRegistrarse(true);
    }

    return (
        <>
            <nav className='navBar'>
                <ul className='navBar__ul'>
                    {/*Boton dedicado a llevarte a la pantalla destacado*/}
                    <li className='navBar__li destacado'><Link to="/catalogo">Destacado</Link></li>
                    {/*Boton dedicado a llevarte a la pantalla con productos de hombre*/}
                    <li className='navBar__li hombre'><Link to="/catalogo">Hombre</Link></li>
                    {/*Boton dedicado a llevarte a la pantalla home*/}
                    <li className='navBar__li li_marca'><Link to="/">Goblidas</Link></li>
                    {/*Boton dedicado a llevarte a la pantalla con productos de mujer*/}
                    <li className='navBar__li mujer'><Link to="/catalogo">Mujer</Link></li>
                    {/*Boton dedicado a llevarte a la pantalla con productos de niños*/}
                    <li className='navBar__li ninos'><Link to="/catalogo">Niños</Link></li>
                    {/*Boton dedicado a llevarte a la pantalla carrito*/}
                    <li className='navBar__li carrito'><Link to="/carrito"><i className="bi bi-cart"></i></Link></li>
                    {/*Boton dedicado a activar los modal de sesion*/}
                    <li className='navBar__li logo'>
                        <div className='navBar__ul__img' onClick={handleModalSesion}>
                            <img src={fotoLogo} alt="L" />
                        </div>
                    </li>
                </ul>
            </nav >
            {modalSesion && (
                <div className='modalSesion'>
                    <ModalSesion
                        onIniciarSesion={handleAbrirIniciarSesion}
                        onRegistrarse={handleAbrirRegistrarse}
                    />
                </div>
            )}
            {modalIniciarSesion && (
                <IniciarSesionModal onClose={() => setModalIniciarSesion(false)} />
            )}
            {modalRegistrarse && (
                <RegistrarSesionModal onClose={() => setModalRegistrarse(false)} />
            )}
        </>
    )
}
