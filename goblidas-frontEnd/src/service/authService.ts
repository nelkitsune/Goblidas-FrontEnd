import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || 'Error en la respuesta del servidor');
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error desconocido al iniciar sesión');
        }
    }
};