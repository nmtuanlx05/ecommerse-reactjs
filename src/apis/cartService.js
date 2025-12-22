import axiosClient from './axiosClient.js';

const addProductToCart = async (data) => {
    return await axiosClient.post('/cart', data);
};

const getCart = async (userId, type = 'cart') => {
    // Truyền params: axios sẽ tự nối thành /cart/123?type=wishlist
    return await axiosClient.get(`/cart/${userId}`, {
        params: {
            type: type
        }
    });
};

const deleteItem = async (body) => {
    return await axiosClient.delete(`/cart/deleteItem`, {
        data: body
    });
};

const deleteCart = async (body) => {
    return await axiosClient.delete(`/cart/delete`, {
        data: body
    });
};

export { addProductToCart, getCart, deleteItem, deleteCart };
