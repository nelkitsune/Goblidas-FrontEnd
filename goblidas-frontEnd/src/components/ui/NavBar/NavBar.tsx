import React, { useState } from 'react'
import './NavBarEstilo.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import fotoLogo from "../../img/goblinLogo.png"
import { Link } from 'react-router-dom';
import { ModalSesion } from '../Modals/ModalSesion/ModalSesion';
import { IniciarSesionModal } from '../Modals/IniciarSesionModal/IniciarSesionModal';
import { RegistrarSesionModal } from '../Modals/RegistrarSesionModal/RegistrarSesionModal';
import { useUsuarioStore } from '../../../store/useUsuarioStore';

export const NavBar = () => {
    const usuario = useUsuarioStore(state => state.usuario);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIniciarSesion, setModalIniciarSesion] = useState(false);
    const [modalRegistrarse, setModalRegistrarse] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);

    const handleModalSesion = () => setModalVisible(!modalVisible);
    const handleHamburguesa = () => setMenuAbierto(!menuAbierto);

    return (
        <>
            <nav className="navBar">
                <button className="navBar__hamburguesa" onClick={handleHamburguesa}>
                    <i className="bi bi-list"></i>
                </button>

                {/* Marca centrada */}
                <div className="navBar__brand">
                    <Link to="/" onClick={() => setMenuAbierto(false)}>Goblidas</Link>
                </div>

                {/* Menú desplegable */}
                <ul className={`navBar__ul${menuAbierto ? ' navBar__ul--abierto' : ''}`}>
                    <li className='navBar__li destacado'>
                        <Link to="/catalogo?highlighted=true" onClick={() => setMenuAbierto(false)}>
                            Destacado
                        </Link>
                    </li>
                    <li className='navBar__li hombre'>
                        <Link to="/catalogo?gender=Masculino" onClick={() => setMenuAbierto(false)}>
                            Hombre
                        </Link>
                    </li>
                    <li className='navBar__li mujer'>
                        <Link to="/catalogo?gender=Femenino" onClick={() => setMenuAbierto(false)}>
                            Mujer
                        </Link>
                    </li>
                    <li className='navBar__li unisex'>
                        <Link to="/catalogo?gender=Unisex" onClick={() => setMenuAbierto(false)}>
                            Unisex
                        </Link>
                    </li>
                    <li className='navBar__li categoria'>
                        <Link to="/catalogo" onClick={() => setMenuAbierto(false)}>
                            Categoría
                        </Link>
                    </li>
                    <li className='navBar__li logo'>
                        <div
                            className='navBar__ul__img'
                            onClick={() => {
                                handleModalSesion();
                                setMenuAbierto(false);
                            }}
                        >
                            <img src={fotoLogo} alt="Logo" />
                        </div>
                    </li>
                    <li className='navBar__li carrito'>
                        <Link to="/carrito" onClick={() => setMenuAbierto(false)}>
                            <i className="bi bi-cart"></i>
                        </Link>
                    </li>
                    {usuario?.role === "ADMIN" && (
                        <li className='navBar__li admin'>
                            <Link to="/admin/productos" onClick={() => setMenuAbierto(false)}>
                                <i className="bi bi-gear"></i>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

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
