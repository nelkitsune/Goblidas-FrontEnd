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
    console.log('Llamando a postDireccion con:', { userId, direccion });
    const response = await api.post('/adress', {
        ...direccion,
        userId
    });
    console.log('Respuesta de postDireccion:', response.data);
    return response.data;
};
export const createUsuarioDireccion = async (userId: number, adressId: number) => {
    const response = await api.post('/useradress', {
        userId: { id: userId },
        adressId: { id: adressId }
    });
    return response.data;
};