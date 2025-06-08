import api from '../components/api/axios';

export interface CartItemDTO {
    detailId: number;
    quantity: number;
    price: number;
}

export interface CreateOrderDTO {
    userAdressId: { id: number }; // Cambiado a objeto con id
    cartItems: CartItemDTO[];
}

export const createOrdenDetail = async (order: CreateOrderDTO) => {
    try {
        const response = await api.post('/orderdetail', order);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

