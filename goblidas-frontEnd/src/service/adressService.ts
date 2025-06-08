import api from '../components/api/axios';

export const getAdress = async () => {
    const response = await api.get('/adress');
    return response.data;
};

export const getAdressByUser = async (userId: number) => {
    const response = await api.get(`/useradress/filter?userId=${userId}`);
    return response.data;
};

export const postDireccion = async (userId: number, direccion: any) => {
    const response = await api.post('/adress', {
        ...direccion,
        userId
    });
    return response.data;
};
export const createUsuarioDireccion = async (userId: number, adressId: number) => {
    const response = await api.post('/useradress', {
        userId: { id: userId },
        adressId: { id: adressId }
    });
    return response.data;
};