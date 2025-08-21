import styles from './styles.module.scss';
import reloadIcon from '@icons/svgs/reloadIcon.svg';
import heart from '@icons/svgs/heartIcon.svg';
import cart from '@icons/svgs/cartIcon.svg';

function ProductItem({ src, preSvrc, name, price }) {
    const {
        boxImg,
        showImgWhenHover,
        showFnWhenHover,
        boxIcon,
        title,
        priceClass
    } = styles;
    return (
        <div>
            <div className={boxImg}>
                <img
                    src={src}
                    alt=''
                />
                <img src={preSvrc} className={showImgWhenHover} />
                <div className={showFnWhenHover}>
                    <div className={boxIcon}>
                        <img src={cart} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={heart} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={reloadIcon} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={cart} alt='' />
                    </div>
                </div>
            </div>
            <div className={title}>{name}</div>
            <div className={priceClass}>${price}</div>
        </div>
    );
}

export default ProductItem;
