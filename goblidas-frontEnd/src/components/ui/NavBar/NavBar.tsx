import React from 'react'
import './NavBarEstilo.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import fotoLogo from "../../img/goblinLogo.png"
import { Link } from 'react-router-dom';
export const NavBar = () => {
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
                        <div className='navBar__ul__img'>
                            <img src={fotoLogo} alt="L" />
                        </div>
                    </li>
                </ul>
            </nav >
        </>
    )
}
