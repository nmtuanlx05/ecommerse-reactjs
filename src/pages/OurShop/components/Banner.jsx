import Button from '@components/Button/Button';
import styles from '../styles.module.scss';
function Banner() {
    const { containerBanner, contentBox, title, boxBtn } = styles;

    return (
        <>
            <div className={containerBanner}>
                <div className={contentBox}>
                    <div className={title}>The Classics Make A Comeback</div>
                    <div className={boxBtn}>
                        <Button content={'Buy now'} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
