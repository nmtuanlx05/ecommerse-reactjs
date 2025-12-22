import Button from '@components/Button/Button';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
function Banner() {
    const { container, content, title, descreption, btnBox } = styles;
    const naviagte = useNavigate();
    return (
        <div className={container}>
            <div className={content}>
                <h1 className={title}>XStore Marseille Demo</h1>
                <div className={descreption}>
                    Make yours celebrations even more special this years with
                    beautiful.
                </div>
                <div className={btnBox} onClick={() => naviagte('/shop')}>
                    <Button content={'Go to shop'} />
                </div>
            </div>
        </div>
    );
}

export default Banner;
