import auth from '../components/api/auth';
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
        const response = await auth.post('/register', user);
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

export const updateUser = async (id: number, user: any) => {
    try {
        console.log('🟢 [updateUser] Usuario que se enviará al backend:', user);
        const response = await api.put(`/user/${id}`, user);
        console.log('🟢 [updateUser] Respuesta recibida del backend:', response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('🔴 [updateUser] Error de respuesta del backend:', error.response.data);
            throw new Error(error.response.data?.message || 'Error en la respuesta del servidor');
        } else if (error.request) {
            console.error('🔴 [updateUser] No se recibió respuesta del backend:', error.request);
            throw new Error('No se recibió respuesta del servidor');
        } else {
            console.error('🔴 [updateUser] Error desconocido:', error.message);
            throw new Error('Error desconocido al actualizar usuario');
        }
    }
};

export const deleteUser = async (id: number) => {
    try {
        console.log('🟢 [deleteUser] ID del usuario a eliminar:', id);
        const response = await api.delete(`/user/${id}`);
        console.log('🟢 [deleteUser] Respuesta recibida del backend:', response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('🔴 [deleteUser] Error de respuesta del backend:', error.response.data);
            throw new Error(error.response.data?.message || 'Error en la respuesta del servidor');
        } else if (error.request) {
            console.error('🔴 [deleteUser] No se recibió respuesta del backend:', error.request);
            throw new Error('No se recibió respuesta del servidor');
        } else {
            console.error('🔴 [deleteUser] Error desconocido:', error.message);
            throw new Error('Error desconocido al eliminar usuario');
        }
    }
};