import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './RegistrarSesionModalEstilo.css';
import fotoLogo from "../../../img/goblinLogo.png";
import { useUsuarioStore } from '../../../../store/useUsuarioStore';
import { createUser } from '../../../../service/userService';
import { Usuario } from '../../../../types/usuario';
import Swal from 'sweetalert2'
import { object, string } from "yup";

export const RegistrarSesionModal = ({ onClose }: { onClose: () => void }) => {
    const { setUsuario } = useUsuarioStore();
    const [name, setNombre] = useState('');
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [aceptaTerminos, setAceptaTerminos] = useState(false);

    const schema = object({
        name: string()
            .required("El campo nombre es obligatorio")
            .min(1, "El nombre tiene que tener al menos un carácter")
            .max(100, "El nombre no puede superar los 100 carácteres"),
        documento: string()
            .required("El documento es obligatorio"),
        email: string()
            .required("El email es obligatorio")
            .email("El email no tiene un formato válido"),
        password: string()
            .required("La contraseña es obligatoria")
            .min(6, "La contraseña debe tener al menos 6 caracteres")
    });

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        // Validación con Yup
        try {
            await schema.validate({ name, documento, email, password }, { abortEarly: false });
        } catch (err: any) {
            // err.inner es un array con todos los errores
            const mensajes = err.inner?.map((e: any) => e.message).join('\n') || err.message;
            Swal.fire({
                title: "Error de validación",
                text: mensajes,
                icon: "error",
                confirmButtonText: "Aceptar"
            });
            return;
        }

        if (password !== repetirPassword) {
            Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
            return;
        }
        if (!aceptaTerminos) {
            Swal.fire({
                title: "Error",
                text: "Debes aceptar los términos y condiciones",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
            return;
        }
        const nuevoUsuario = {
            name,
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
                name: usuarioCreado.name ?? "",
                dni: usuarioCreado.dni ?? "",
            }
            console.log("Usuario que se setea en el store:", usuario);
            setUsuario(usuario);
            Swal.fire({
                icon: 'success',
                title: 'Cuenta creada exitosamente',
                text: `Bienvenido ${usuario.name}!`,
            });
            onClose();
        }).catch((error) => {
            console.error("Error al crear el usuario:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la cuenta',
                text: error.response?.data?.message || 'Ocurrió un error inesperado.',
            });
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
                    <input type="text" placeholder="Nombre" required value={name} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className='form-group'>
                    <input type="text" placeholder="Documento/Pasaporte" required value={documento} onChange={e => setDocumento(e.target.value)} />
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
