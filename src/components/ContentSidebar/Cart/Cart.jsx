import HeaderSideBar from '@components/ContentSidebar/components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '@components/ContentSidebar/components/ItemProduct/ItemProduct';
import { PiShoppingCartLight } from 'react-icons/pi';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';
function Cart() {
    const {
        container,
        boxBtn,
        total,
        containerListProductCart,
        overlayLoading,
        isEmpty,
        boxEmpty,
        textEmpty,
        boxBtnEmpty,
        containerListItem
    } = styles;

    const navigate = useNavigate();

    const handleNavigateToshop = () => {
        navigate('/shop');
        setIsOpen(false);
    };

    const { listProductCart, isLoading, setIsOpen } =
        useContext(SideBarContext);

    console.log(listProductCart);

    const subTotal = listProductCart.reduce((acc, item) => {
        return acc + item.total;
    }, 0);

    console.log(subTotal);

    return (
        <div
            className={cls(container, {
                [isEmpty]: !listProductCart.length
            })}
        >
            <HeaderSideBar
                icon={<PiShoppingCartLight style={{ fontSize: '30px' }} />}
                title='CART'
            />
            {listProductCart.length ? (
                <div className={containerListItem}>
                    <div>
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
                            <p>${subTotal}</p>
                        </div>

                        <div className={boxBtn}>
                            <Button
                                content={'VIEW CART'}
                                className={styles.cartBtn}
                            />
                            <Button
                                content={'CHECKOUT'}
                                isPrinary={false}
                                className={styles.cartBtn}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={boxEmpty}>
                    <div className={textEmpty}>No product in the cart</div>
                    <div className={boxBtnEmpty}>
                        <Button
                            content={'RETURN TO SHOP'}
                            isPrinary={false}
                            onClick={handleNavigateToshop}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
