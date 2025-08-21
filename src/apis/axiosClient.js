import axios from 'axios';
const axiosClient = axios.create({
    baseURL:
        'https://be-project-reactjs.onrender.com/api/v1/product?sortType=3&page=1&limit=15',
    timeout: 10000, // tối đa 10 giây
    headers: {
        'Content-Type': 'application/json' // mặc định gửi JSON
    }
});
export default axiosClient;
