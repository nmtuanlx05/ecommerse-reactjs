import axiosClient from './axiosClient.js';

const getProduct = async (query) => {
    const { sortType, page, limit } = query;

    const querylimit = limit === 'all' ? '' : limit;

    const res = await axiosClient.get(
        `/product?sortType=${sortType}&page=${page}&limit=${querylimit}`
    );
    return res.data;
};

const getDetailProduct = async (id) => {
    const res = await axiosClient.get(`/product/${id}`);

    return res.data;
};

const getRelatedProduct = async (id) => {
    const res = await axiosClient.get(`/related-products/${id}`);

    return res.data.relatedProducts;
};

export { getProduct, getDetailProduct, getRelatedProduct };
