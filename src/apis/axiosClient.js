import axios from 'axios';
const axiosClient = axios.create({
    baseURL: 'https://be-project-reactjs.onrender.com/api/v1',
    timeout: 30000, // tối đa 10 giây
    headers: {
        'Content-Type': 'application/json' // mặc định gửi JSON
    }
});
export default axiosClient;
