import axiosClient from './axiosClient.js';

const getProduct = async () => {
    const res = await axiosClient.get('/product?sortType=3&page=1&limit=15');
    return res.data;
};

export { getProduct };
