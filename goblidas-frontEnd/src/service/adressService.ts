import api from '../components/api/axios';

export const getAdress = async () => {
    const response = await api.get('/adress');
    return response.data;
};

export const getAdressByUser = async (userId: string) => {
    const response = await api.get(`/useradress/${userId}`);
    return response.data;
};