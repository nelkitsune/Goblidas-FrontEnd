import api from '../components/api/axios';

export const createPaymentPreference = async (orderId: number) => {
    try {
        const response = await api.post('/payment/create', orderId, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error: any) {
        throw error;
    }
};