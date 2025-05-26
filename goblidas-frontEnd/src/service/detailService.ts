// src/services/userService.ts
import api from '../components/api/axios';

export const getDetalles = async () => {
    const response = await api.get('/detail');
    return response.data;
};
