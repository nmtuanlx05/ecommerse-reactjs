import HeaderSideBar from '@components/ContentSidebar/components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '@components/ContentSidebar/components/ItemProduct/ItemProduct';
import { PiShoppingCartLight } from 'react-icons/pi';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';
function Cart() {
    const {
        container,
        boxBtn,
        total,
        containerListProductCart,
        overlayLoading
    } = styles;

    const { listProductCart, isLoading } = useContext(SideBarContext);
    return (
        <div className={container}>
            <div>
                {' '}
                <HeaderSideBar
                    icon={<PiShoppingCartLight style={{ fontSize: '30px' }} />}
                    title='CART'
                />
                {isLoading ? (
                    <LoadingTextCommon />
                ) : (
                    listProductCart.map((item, index) => (
                        <ItemProduct
                            key={index}
                            src={item.images[0]}
                            nameProduct={item.name}
                            priceProduct={item.price}
                            skuProuct={item.sku}
                            sizeProduct={item.size}
                            quantity={item.quantity}
                            productId={item.productId}
                            userId={item.userId}
                        />
                    ))
                )}
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
