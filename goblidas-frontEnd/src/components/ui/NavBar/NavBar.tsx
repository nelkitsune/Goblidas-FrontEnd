import React, { useState } from 'react'
import './NavBarEstilo.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import fotoLogo from "../../img/goblinLogo.png"
import { Link } from 'react-router-dom';
import { ModalSesion } from '../Modals/ModalSesion/ModalSesion';
import { IniciarSesionModal } from '../Modals/IniciarSesionModal/IniciarSesionModal';
import { RegistrarSesionModal } from '../Modals/RegistrarSesionModal/RegistrarSesionModal';
import { useUsuarioStore } from '../../../store/useUsuarioStore'; // Ajusta el path si es necesario


export const NavBar = () => {
    const usuario = useUsuarioStore(state => state.usuario);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIniciarSesion, setModalIniciarSesion] = useState(false);
    const [modalRegistrarse, setModalRegistrarse] = useState(false);

    const handleModalSesion = () => {
        setModalVisible(!modalVisible);
    }

    const handleAbrirIniciarSesion = () => {
        setModalVisible(false);
        setModalIniciarSesion(true);
    }

    const handleAbrirRegistrarse = () => {
        setModalVisible(false);
        setModalRegistrarse(true);
    }

    return (
        <>
            <nav className='navBar'>
                <ul className='navBar__ul'>
                    {/*Boton dedicado a llevarte a la pantalla destacado*/}
                    <li className='navBar__li destacado'>
                        <Link to="/catalogo">Destacado</Link>
                    </li>
                    {/*Boton dedicado a llevarte a la pantalla con productos de hombre*/}
                    <li className='navBar__li hombre'>
                        <Link to="/catalogo?gender=HOMBRE">Hombre</Link>
                    </li>
                    {/*Boton dedicado a llevarte a la pantalla home*/}
                    <li className='navBar__li li_marca'><Link to="/">Goblidas</Link></li>
                    {/*Boton dedicado a llevarte a la pantalla con productos de mujer*/}
                    <li className='navBar__li mujer'>
                        <Link to="/catalogo?gender=MUJER">Mujer</Link>
                    </li>
                    {/*Boton dedicado a llevarte a la pantalla con productos de niños*/}
                    <li className='navBar__li ninos'>
                        <Link to="/catalogo?gender=NIÑOS">Niños</Link>
                    </li>
                    {/*Boton dedicado a llevarte a la pantalla carrito*/}
                    <li className='navBar__li carrito'><Link to="/carrito"><i className="bi bi-cart"></i></Link></li>


                    {usuario?.role === "ADMIN" && (
                        <>
                            <li className='navBar__li admin'>
                                <Link to="/admin/productos"><i className="bi bi-gear"></i></Link>
                            </li>
                        </>
                    )}
                    {/*Boton dedicado a activar los modal de sesion*/}
                    <li className='navBar__li logo'>
                        <div className='navBar__ul__img' onClick={handleModalSesion}>
                            <img src={fotoLogo} alt="L" />
                        </div>
                    </li>
                </ul>
            </nav >
            {modalVisible && (
                <ModalSesion
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onIniciarSesion={() => {
                        setModalVisible(false);
                        setModalIniciarSesion(true);
                        setModalRegistrarse(false);
                    }}
                    onRegistrarse={() => {
                        setModalVisible(false);
                        setModalIniciarSesion(false);
                        setModalRegistrarse(true);
                    }}
                />
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
