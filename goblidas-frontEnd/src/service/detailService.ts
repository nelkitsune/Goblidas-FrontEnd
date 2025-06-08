
import api from '../components/api/axios';

export const getDetalles = async () => {
    const response = await api.get('/detail');
    return response.data;
};

export const postDetalle = async (detalle: any) => {
    const response = await api.post('/detail', detalle);
    return response.data;
}

export const putDetalle = async (id: number, detalle: any) => {
    const response = await api.put(`/detail/${id}`, detalle);
    return response.data;
};
export const deleteDetalle = async (id: number) => {
    const response = await api.delete(`/detail/${id}`);
    return response.data;
};