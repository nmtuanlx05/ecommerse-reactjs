import Button from '@components/Button/Button';
import styles from './styles.module.scss';
function Banner() {
    const { container, content, title, descreption, btnBox } = styles;
    return (
        <div className={container}>
            <div className={content}>
                <h1 className={title}>XStore Marseille Demo</h1>
                <div className={descreption}>
                    Make yours celebrations even more special this years with
                    beautiful.
                </div>
                <div className={btnBox}>
                    <Button content={'Go to shop'} />
                </div>
            </div>
        </div>
    );
}

export default Banner;
