import api from '../components/api/axios';

export interface CartItemDTO {
    detailId: number;
    quantity: number;
    price: number;
}
export interface CreateOrderDetail {
    orderId: { id: number };
    detailId: { id: number };
    quantity: number;
    unitPrice: number;
}

export interface CreateOrderDTO {
    userAdressId: number // Cambiado a objeto con id
    cartItems: CartItemDTO[];
}


export interface CartItemDTO {
    detailId: number;
    quantity: number;
    price: number;
}

export interface CreateOrderDTO {
    userAdressId: number; // Cambiado a objeto con id
    cartItems: CartItemDTO[];
}

export const createOrder = async (order: CreateOrderDTO) => {
    try {
        const response = await api.post('/order/create', order);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const createOrderDetail = async (detalles: CreateOrderDetail) => {
    try {
        const response = await api.post('/orderdetail', detalles);
        return response.data;
    } catch (error: any) {
        throw error;
    }
}
