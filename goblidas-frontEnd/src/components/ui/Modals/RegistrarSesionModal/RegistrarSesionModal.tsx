import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './RegistrarSesionModalEstilo.css';
import fotoLogo from "../../../img/goblinLogo.png";
import { useUsuarioStore } from '../../../../store/useUsuarioStore';
import { Usuario } from '../../../../store/types/usuario';

export const RegistrarSesionModal = ({ onClose }: { onClose: () => void }) => {
    const { setUsuario } = useUsuarioStore();

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState('');
    const [repetirDocumento, setRepetirDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [aceptaTerminos, setAceptaTerminos] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setUsuario({
            nombre,
            apellido,
            documento,
            repetirDocumento,
            email,
            password,
            aceptaTerminos
        });
        onClose();
    };

    return (
        <div className='RegistrarSesionModal'>
            <form onSubmit={handleSubmit}>
                <button className='botonCierre' type="button" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
                <h2>Crear cuenta</h2>
                <h3>Datos personales</h3>
                <div className='form-group'>
                    <input type="text" placeholder="Nombre" required value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className='form-group'>
                    <input type="text" placeholder="Apellido" required value={apellido} onChange={e => setApellido(e.target.value)} />
                </div>
                <div className='form-group'>
                    <input type="text" placeholder="Documento" required value={documento} onChange={e => setDocumento(e.target.value)} />
                </div>
                <div className='form-group'>
                    <input type="text" placeholder="Repetir documento" required value={repetirDocumento} onChange={e => setRepetirDocumento(e.target.value)} />
                </div>
                <h3>Introduce un e-mail y una contraseña</h3>
                <div className='form-group'>
                    <input type="email" placeholder="E-mail" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='form-group'>
                    <input type="password" placeholder="Contraseña" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='form-group'>
                    <input type="password" placeholder="Repetir contraseña" required value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} />
                </div>
                <div className='form-group checkbox'>
                    <input type="checkbox" id="terms" required checked={aceptaTerminos} onChange={e => setAceptaTerminos(e.target.checked)} />
                    <label htmlFor="terms">Acepto los <a href="#">Términos y Condiciones</a> y las <a href="#">Políticas de Privacidad</a></label>
                </div>
                <button type="submit" className="btn-submit">Crear cuenta</button>
            </form>
        </div>
    );
};
