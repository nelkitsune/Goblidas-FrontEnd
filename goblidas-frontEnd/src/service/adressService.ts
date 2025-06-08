import api from '../components/api/axios';

export const getAdress = async () => {
    const response = await api.get('/adress');
    return response.data;
};

export const getAdressByUser = async (userId: number) => {
    const response = await api.get(`/useradress/filter?userId=${userId}`);
    return response.data;
};