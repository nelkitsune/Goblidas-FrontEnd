import api from '../components/api/axios';

export const getCategory = async () => {
    const response = await api.get('/category');
    return response.data;
};

export const getCategoryById = async (id: number) => {
    const response = await api.get(`/category/${id}`);
    return response.data;
}
export const postCategory = async (category: any) => {
    const response = await api.post('/category', category);
    return response.data;
}