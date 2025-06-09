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
export const postDiscountPrice = async (discount: any) => {
    const response = await api.post('/discount', discount);
    return response.data;
};
export const postDiscountPriceByProductId = async (discount: {
    discountId: number;
    priceId: number;
    active: boolean;
}) => {
    const payload = {
        active: discount.active,
        discountId: { id: discount.discountId },
        priceId: { id: discount.priceId },
    };

    const response = await api.post(`/discountprice`, payload);
    return response.data;
};