import api from '../components/api/axios';

export const getOrdersByUser = async (userId: number) => {
    try {
        const response = await api.get(`/order/user/${userId}`);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};