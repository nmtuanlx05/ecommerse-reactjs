import styles from './styles.module.scss';
import { IoCloseOutline } from 'react-icons/io5';

function ItemProduct() {
    const { container, boxContent, title, price, boxClose,size } = styles;
    return (
        <div className={container}>
            <img
                src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
                alt='item1'
            />

            <div className={boxClose}>
                <IoCloseOutline size={24} color='#c7c3c4' />
            </div>

            <div className={boxContent}>
                <div className={title}>Title of product</div>
                <div className={size}>Size:M</div>
                <div className={price}>$119.99</div>
                <div className={price}>SKU: 12349</div>
            </div>
        </div>
    );
}

export default ItemProduct;
