
import api from '../components/api/axios';

export const getDiscountPrice = async () => {
    const response = await api.get('/discountprice');
    return response.data;
};
export const getDescuentos = async () => {
    const response = await api.get('/discount');
    return response.data;
};
export const getDiscountByProductId = async (productId: number) => {
    const response = await api.get(`/discountprice/${productId}`);
    return response.data;
};