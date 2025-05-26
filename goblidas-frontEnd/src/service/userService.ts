import api from '../components/api/axios';

export const getUsers = async () => {
    const response = await api.get('/user');
    return response.data;
};

export const getUserById = async (id: number) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
}

export const createUser = async (user: any) => {
    try {
        console.log('🟢 [createUser] Usuario que se enviará al backend:', user);
        const response = await api.post('/user', user);
        console.log('🟢 [createUser] Respuesta recibida del backend:', response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('🔴 [createUser] Error de respuesta del backend:', error.response.data);
            throw new Error(error.response.data?.message || 'Error en la respuesta del servidor');
        } else if (error.request) {
            console.error('🔴 [createUser] No se recibió respuesta del backend:', error.request);
            throw new Error('No se recibió respuesta del servidor');
        } else {
            console.error('🔴 [createUser] Error desconocido:', error.message);
            throw new Error('Error desconocido al crear usuario');
        }
    }
};