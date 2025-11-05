import axiosClient from './axiosClient';

const createOrder = async (data) => {
    return await axiosClient.post(`/orders`, data);
};

const getDetailOrder = async (id) => {
    return await axiosClient.get(`/orders/${id}`);
};

export { createOrder, getDetailOrder };
