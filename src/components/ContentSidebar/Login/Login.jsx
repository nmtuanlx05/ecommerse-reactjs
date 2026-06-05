import InputCommon from '@components/InputCommon/InputComon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { ToastContext } from '@/contexts/ToastProvider';
import { register, signIn, getInfo } from '@/apis/authService';
import Cookies from 'js-cookie';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { StoreContext } from '@/contexts/StoreProvider';

import { useNavigate } from 'react-router-dom';

function Login() {
    const { container, title, boxRememberMe, lostPW } = styles;
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useContext(ToastContext);
    const { setIsOpen, handleGetListProductsCart } = useContext(SideBarContext);
    const { setUserId, setUserInfo } = useContext(StoreContext);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            cfmpassword: ''
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            cfmpassword: isRegister
                ? Yup.string()
                      .required('Confirm password is required')
                      .oneOf([Yup.ref('password')], 'Passwords must match')
                : Yup.string() // Nếu đang ở màn Đăng nhập (isRegister = false) thì cho qua luôn
        }),
        onSubmit: async (values) => {
            if (isLoading) return; // Chặn click nhiều lần
            const { email: username, password } = values;

            setIsLoading(true); // Bật loading bắt đầu xử lý

            try {
                //  XỬ LÝ ĐĂNG KÝ (REGISTER)
                if (isRegister) {
                    const res = await register({ username, password });
                    toast.success(res.data.message);
                    setIsOpen(false); // Đóng popup nếu cần
                    // Không cần setIsLoading(false) ở đây nữa vì đã có finally bên dưới
                }

                //  XỬ LÝ ĐĂNG NHẬP (LOGIN)
                else {
                    const res = await signIn({ username, password });
                    const { id, token, refreshToken, role } = res.data;

                    // Lưu thông tin
                    setUserId(id);
                    Cookies.set('userId', id);
                    Cookies.set('token', token);
                    Cookies.set('refreshToken', refreshToken);

                    toast.success('Sign in successfully!');
                    setIsOpen(false);

                    // Lấy giỏ hàng
                    handleGetListProductsCart(id, 'cart');

                    // Chuyển trang
                    if (role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                }
            } catch (err) {
                // Show actual error message from server, or default message
                const errorMessage =
                    err?.response?.data?.message ||
                    (isRegister
                        ? 'Registration failed. Please try again.'
                        : 'Login failed. Please check your credentials.');
                toast.error(errorMessage);
            } finally {
                //  LUÔN LUÔN TẮT LOADING
                // Dù thành công hay thất bại, code đều sẽ chạy qua đây
                setIsLoading(false);
            }
        }
    });

    const handleToggle = () => {
        setIsRegister(!isRegister);
        formik.resetForm();
    };

    return (
        <div className={container}>
            <div className={title}>{isRegister ? 'SIGN UP' : 'SIGN IN'}</div>
            <form onSubmit={formik.handleSubmit}>
                <InputCommon
                    id='email'
                    label='Username or email'
                    type='text'
                    isRequired
                    formik={formik}
                />

                <InputCommon
                    id='password'
                    label='Password'
                    type='password'
                    isRequired
                    formik={formik}
                />

                {isRegister && (
                    <InputCommon
                        id='cfmpassword'
                        label='Confirm Password'
                        type='password'
                        isRequired
                        formik={formik}
                    />
                )}

                {!isRegister && (
                    <div className={boxRememberMe}>
                        <input type='checkbox' />
                        <span>Remember me</span>
                    </div>
                )}

                <Button
                    content={
                        isLoading
                            ? 'LOADING...'
                            : isRegister
                              ? 'REGISTER'
                              : 'LOGIN'
                    }
                    className={styles.loginBtn}
                    type='submit'
                    disabled={isLoading}
                />
                <Button
                    content={
                        isRegister
                            ? 'Already have an account?'
                            : 'Don`t have an account'
                    }
                    className={styles.loginBtn}
                    type='button'
                    isPrinary={false}
                    style={{ marginTop: '10px' }}
                    onClick={handleToggle}
                />
            </form>

            {!isRegister && <div className={lostPW}>Lost your password?</div>}
        </div>
    );
}

export default Login;
