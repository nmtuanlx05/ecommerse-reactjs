import styles from './styles.module.scss';
import reloadIcon from '@icons/svgs/reloadIcon.svg';
import heart from '@icons/svgs/heartIcon.svg';
import cart from '@icons/svgs/cartIcon.svg';

function ProductItem({src , preSvrc , name , price }) {
    const { boxImg, showImgWhenHover, showFnWhenHover , boxIcon , title , priceClass } = styles;
    return (
        <div>
            <div className={boxImg}>
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min-285x340.jpg'
                    alt=''
                />
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.2-min-285x340.jpg'
                    alt=''
                    className={showImgWhenHover}
                />
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
            <div className={title}>10K Yellow Gold</div>
            <div className={priceClass}>$99.99</div>
        </div>
    );
}

export default ProductItem;
