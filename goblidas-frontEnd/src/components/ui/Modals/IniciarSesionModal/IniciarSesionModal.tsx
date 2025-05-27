import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './IniciarSesionModalEstilo.css'
import fotoLogo from "../../../img/goblinLogo.png"
import { useUsuarioStore } from '../../../../store/useUsuarioStore';
import { loginUser } from '../../../../service/authService';

export const IniciarSesionModal = ({ onClose }: { onClose: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUsuario } = useUsuarioStore();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const usuario = await loginUser(email, password);
            setUsuario(usuario);
            alert('¡Sesión iniciada!');
            onClose();
        } catch (error: any) {
            alert(error.message || 'Email o contraseña incorrectos');
        }
    };
    return (
        <div className='IniciarSesionModal'>
            <form onSubmit={handleSubmit}>
                <button className='botonCierre' onClick={onClose}><i className="bi bi-x-lg"></i></button>
                <div className='ContenedorFoto'>
                    <img src={fotoLogo} alt="" />
                </div>
                <h2>Iniciar Sesión</h2>
                <div className='form-group'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Enviar</button>
                <p>¿No tienes una cuenta? <a href="#">Regístrate aquí</a></p>
            </form>
        </div>
    )
}
