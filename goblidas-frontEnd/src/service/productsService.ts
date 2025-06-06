import api from '../components/api/axios';

export const getProductos = async () => {
    const response = await api.get('/product');
    return response.data;
};

export const filtrarProductos = async (filtros: any) => {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, value as string);
        }
    });
    const response = await api.get(`/product/filter?${params.toString()}`);
    return response.data;
};