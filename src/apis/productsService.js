import axiosClient from './axiosClient.js';

const getProduct = async (query) => {
    const { sortType, page, limit } = query;

    const querylimit = limit === 'all' ? '' : limit;

    const res = await axiosClient.get(
        `/product?sortType=${sortType}&page=${page}&limit=${querylimit}`
    );
    return res.data;
};

// Hàm này vừa lấy tất cả, vừa tìm kiếm
export const getProducts = async (params) => {
    // params sẽ là object kiểu { search: 'áo thun', limit: 10 ... }
    return await axiosClient.get('/product', { params });
};

const getDetailProduct = async (id) => {
    const res = await axiosClient.get(`/product/${id}`);

    return res.data;
};

const getRelatedProduct = async (id) => {
    const res = await axiosClient.get(`/related-products/${id}`);

    return res.data.relatedProducts;
};

// API cho ADMIN

// Hàm lấy tất cả sản phẩm cho bảng Admin
const getAllProducts = async () => {
    // Lưu ý: Backend cần có route /product/get-all hoặc bạn dùng /product nhưng chỉnh limit=all
    return await axiosClient.get('/product/get-all');
};

// Hàm tạo sản phẩm mới (Form thêm mới gọi cái này)
const createProduct = async (data) => {
    // data chính là cái JSON chứa name, price, images...
    return await axiosClient.post('/product/create', data);
};

// Hàm xóa sản phẩm
const deleteProduct = async (id) => {
    return await axiosClient.delete(`/product/delete/${id}`);
};

// ham sua san pham
const updateProduct = async (id, data) => {
    // data là cục JSON chứa thông tin mới
    return await axiosClient.put(`/product/update/${id}`, data);
};

export {
    getProduct,
    getDetailProduct,
    getRelatedProduct,
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
};
