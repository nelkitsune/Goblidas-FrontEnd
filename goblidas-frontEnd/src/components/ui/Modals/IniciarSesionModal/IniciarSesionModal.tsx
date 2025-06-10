import React, { useState } from 'react'
import * as Yup from 'yup'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './IniciarSesionModalEstilo.css'
import fotoLogo from "../../../img/goblinLogo.png"
import { useUsuarioStore } from '../../../../store/useUsuarioStore';
import { loginUser } from '../../../../service/authService';
import { getUsers } from '../../../../service/userService';
import Swal from 'sweetalert2'

const schema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
});

export const IniciarSesionModal = ({ onClose }: { onClose: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const { setUsuario } = useUsuarioStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await schema.validate({ email, password }, { abortEarly: false });
            setErrors({});
            const { token } = await loginUser(email, password);
            localStorage.setItem('token', token);
            const users = await getUsers();
            const usuarioLogeado = users.find((user: any) => user.email === email);
            setUsuario(usuarioLogeado);
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: `Bienvenido ${usuarioLogeado.nombre}!`,
            });
            onClose();
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                const newErrors: { email?: string; password?: string } = {};
                error.inner.forEach((err: any) => {
                    if (err.path) newErrors[err.path as 'email' | 'password'] = err.message;
                });
                setErrors(newErrors);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al iniciar sesión',
                    text: error.response?.data?.message || 'Ocurrió un error inesperado.',
                });
            }
        }
    };

    return (
        <div className='IniciarSesionModal'>
            <button className='botonCierre' type="button" onClick={onClose}>
                <i className="bi bi-x-lg"></i>
            </button>
            <form onSubmit={handleSubmit}>
                <div className='ContenedorFoto'>
                    <img src={fotoLogo} alt="" />
                </div>
                <h2>Iniciar Sesión</h2>
                <div className='form-group'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <button type="submit">Enviar</button>
                <p>¿No tienes una cuenta? <a href="#">Regístrate aquí</a></p>
            </form>
        </div>
    )
}
