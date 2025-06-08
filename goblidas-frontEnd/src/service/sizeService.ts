import api from '../components/api/axios';

export const getSize = async () => {
    const response = await api.get('/size');
    return response.data;
};

export const getsizeById = async (id: number) => {
    const response = await api.get(`/size/${id}`);
    return response.data;
}
export const postSize = async (size: any) => {
    const response = await api.post('/size', size);
    return response.data;
}