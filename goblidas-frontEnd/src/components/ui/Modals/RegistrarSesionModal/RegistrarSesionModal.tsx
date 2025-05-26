import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './RegistrarSesionModalEstilo.css';
import fotoLogo from "../../../img/goblinLogo.png";
import { useUsuarioStore } from '../../../../store/useUsuarioStore';
// Importa la función createUser desde donde esté definida
import { createUser } from '../../../../service/userService';
import { Usuario } from '../../../../types/usuario';

export const RegistrarSesionModal = ({ onClose }: { onClose: () => void }) => {
    const { setUsuario } = useUsuarioStore();

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [aceptaTerminos, setAceptaTerminos] = useState(false);


    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (password !== repetirPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        if (!aceptaTerminos) {
            alert("Debes aceptar los términos y condiciones");
            return;
        }
        // Usa los nombres correctos para el backend
        const nuevoUsuario = {
            nombre,
            dni: documento,
            email,
            password,
            rol: "CUSTOMER"
        };
        console.log("Enviando usuario al backend:", nuevoUsuario);
        createUser(nuevoUsuario).then((usuarioCreado) => {
            console.log("Respuesta del backend al crear usuario:", usuarioCreado);
            const usuario: Usuario = {
                id: usuarioCreado.id,
                password: usuarioCreado.password,
                role: usuarioCreado.rol ?? "CUSTOMER",
                email: usuarioCreado.email,
                name: usuarioCreado.nombre ?? "",
                dni: usuarioCreado.dni ?? "",
            }
            console.log("Usuario que se setea en el store:", usuario);
            setUsuario(usuario);
            alert("Usuario creado exitosamente");
            onClose();
        }).catch((error) => {
            console.error("Error al crear el usuario:", error);
            alert("Error al crear el usuario. Por favor, inténtalo de nuevo.");
        });
    }


    return (
        <div className='RegistrarSesionModal'>
            <form >
                <button className='botonCierre' type="button" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
                <h2>Crear cuenta</h2>
                <div className='form-group'>
                    <input type="text" placeholder="Nombre" required value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className='form-group'>
                    <input type="text" placeholder="Documento" required value={documento} onChange={e => setDocumento(e.target.value)} />
                </div>
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
                <button type="submit" className="btn-submit" onClick={handleSubmit}>Crear cuenta</button>
            </form>
        </div>
    );
};
