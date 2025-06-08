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
export const postProducto = async (producto: any) => {
    const response = await api.post('/product', producto);
    return response.data;
}
export const putProducto = async (id: number, producto: any) => {
    const response = await api.put(`/product/${id}`, producto);
    return response.data;
};
export const deleteProducto = async (id: number) => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
};
export const getProductoPorId = async (id: number) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
};