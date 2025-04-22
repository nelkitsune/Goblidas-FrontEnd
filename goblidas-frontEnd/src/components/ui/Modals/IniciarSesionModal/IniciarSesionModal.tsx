import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './IniciarSesionModalEstilo.css'
import fotoLogo from "../../../img/goblinLogo.png"

export const IniciarSesionModal = () => {
    return (
        <div className='IniciarSesionModal'>
            <form>
                <button className='botonCierre'><i className="bi bi-x-lg"></i></button>
                <div className='ContenedorFoto'>
                    <img src={fotoLogo} alt="" />
                </div>
                <h2>Iniciar Sesión</h2>
                <div className='form-group'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Enviar</button>
                <p>¿No tienes una cuenta? <a href="#">Regístrate aquí</a></p>
            </form>
        </div>
    )
}
