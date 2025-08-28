import InputCommon from '@components/InputCommon/InputComon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
function Login() {
    const { container, title, boxRememberMe, lostPW } = styles;

    return (
        <div className={container}>
            <div className={title}>SIGN IN</div>
            <InputCommon label='Username or email' type='text' isRequired />
            <InputCommon label='Password' type='password' isRequired />

            <div className={boxRememberMe}>
                <input type='checkbox' />
                <span>Remember me</span>
            </div>

            <Button content={'LOGIN'} className={styles.loginBtn} />

            <div className={lostPW}>Lost your password?</div>
        </div>
    );
}

export default Login;
