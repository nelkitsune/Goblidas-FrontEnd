import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    },
});

// Interceptor para agregar el token a cada petición (excepto login)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.url !== '/auth/login') {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;