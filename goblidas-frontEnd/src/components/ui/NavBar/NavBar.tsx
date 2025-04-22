import React from 'react'
import './NavBarEstilo.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import fotoLogo from "../../img/goblinLogo.png"
export const NavBar = () => {
    return (
        <>
            <nav className='navBar'>
                <ul className='navBar__ul'>
                    {/*Boton dedicado a llevarte a la pantalla destacado*/}
                    <li className='navBar__li destacado'>Destacado</li>
                    {/*Boton dedicado a llevarte a la pantalla con productos de hombre*/}
                    <li className='navBar__li hombre'>Hombre</li>
                    {/*Boton dedicado a llevarte a la pantalla home*/}
                    <li className='li_marca navBar__li nombre'>Goblidas</li>
                    {/*Boton dedicado a llevarte a la pantalla con productos de mujer*/}
                    <li className='navBar__li mujer'>Mujer</li>
                    {/*Boton dedicado a llevarte a la pantalla con productos de niños*/}
                    <li className='navBar__li ninos'>Niños</li>
                    {/*Boton dedicado a llevarte a la pantalla carrito*/}
                    <li className='navBar__li carrito'><i className="bi bi-cart"></i></li>
                    {/*Boton dedicado a activar los modal de sesion*/}
                    <li className='navBar__li logo'>
                        <div className='navBar__ul__img'>
                            <img src={fotoLogo} alt="L" />
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}
