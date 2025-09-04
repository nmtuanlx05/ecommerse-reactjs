import HeaderSideBar from '@components/ContentSidebar/components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '@components/ContentSidebar/components/ItemProduct/ItemProduct';
import { PiShoppingCartLight } from 'react-icons/pi';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
function Cart() {
    const { container, boxBtn, total } = styles;
    return (
        <div className={container}>
            <div>
                {' '}
                <HeaderSideBar
                    icon={<PiShoppingCartLight style={{ fontSize: '30px' }} />}
                    title='CART'
                />
                <ItemProduct />
            </div>
            <div>
                <div className={total}>
                    <p style={{ fontWeight: 'bold' }}>Subtotal:</p>
                    <p>$199.99</p>
                </div>

                <div className={boxBtn}>
                    <Button content={'VIEW CART'} className={styles.cartBtn} />
                    <Button
                        content={'CHECKOUT'}
                        isPrinary={false}
                        className={styles.cartBtn}
                    />
                </div>
            </div>
        </div>
    );
}

export default Cart;
