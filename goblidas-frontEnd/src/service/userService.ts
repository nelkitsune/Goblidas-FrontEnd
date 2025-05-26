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
    console.log('🟢 [createUser] Usuario que se enviará al backend:', user);
    const response = await api.post('/user', user);
    console.log('🟢 [createUser] Respuesta recibida del backend:', response.data);
    return response.data;
};