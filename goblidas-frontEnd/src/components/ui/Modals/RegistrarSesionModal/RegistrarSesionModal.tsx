import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './RegistrarSesionModalEstilo.css';
import fotoLogo from "../../../img/goblinLogo.png";

export const RegistrarSesionModal = () => {
    return (
        <div className='RegistrarSesionModal'>
            <form>
                <button className='botonCierre'><i className="bi bi-x-lg"></i></button>

                <h2>Crear cuenta</h2>
                <h3>Datos personales</h3>
                <div className='form-group'>
                    <input type="text" placeholder="Nombre" required />
                </div>
                <div className='form-group'>
                    <input type="text" placeholder="Apellido" required />
                </div>
                <div className='form-group'>
                    <input type="text" placeholder="Documento" required />
                </div>
                <div className='form-group'>
                    <input type="text" placeholder="Repetir documento" required />
                </div>
                <h3>Introduce un e-mail y una contraseña</h3>
                <div className='form-group'>
                    <input type="email" placeholder="E-mail" required />
                </div>
                <div className='form-group'>
                    <input type="password" placeholder="Contraseña" required />
                </div>
                <div className='form-group'>
                    <input type="password" placeholder="Repetir contraseña" required />
                </div>
                <div className='form-group checkbox'>
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">Acepto los <a href="#">Términos y Condiciones</a> y las <a href="#">Políticas de Privacidad</a></label>
                </div>
                <button type="submit" className="btn-submit">Crear cuenta</button>
            </form>
        </div>
    );
};
