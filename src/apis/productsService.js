import axiosClient from './axiosClient.js';

const getProduct = async () => {
    const res = await axiosClient.get('/product');
    return res.data;
};

export { getProduct };
