import axiosClient from './axiosClient';

const register = async (body) => {
    return await axiosClient.post('/register', body);
};

const signIn = async (body) => {
    return await axiosClient.post('/login', body);
};

const getInfo = async () => {
    return await axiosClient.get(
        '/user/info/6f6d4b7b-06f2-401f-b20b-b05f20d51a9f'
    );
};

export { register, signIn, getInfo };
