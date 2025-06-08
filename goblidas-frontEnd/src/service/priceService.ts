import api from '../components/api/axios';

export const getPrice = async () => {
    const response = await api.get('/price');
    return response.data;
};

export const getPriceById = async (id: number) => {
    const response = await api.get(`/price/${id}`);
    return response.data;
}
export const postPrice = async (price: any) => {
    const response = await api.post('/price', price);
    return response.data;
}
export const putPrice = async (id: number, price: any) => {
    const response = await api.put(`/price/${id}`, price);
    return response.data;
};