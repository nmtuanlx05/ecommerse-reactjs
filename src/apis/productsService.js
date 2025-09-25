import axiosClient from './axiosClient.js';

const getProduct = async (query) => {
    const { sortType, page, limit } = query;

    const querylimit = limit === 'all' ? '' : limit;

    const res = await axiosClient.get(
        `/product?sortType=${sortType}&page=${page}&limit=${querylimit}`
    );
    return res.data;
};

export { getProduct };
