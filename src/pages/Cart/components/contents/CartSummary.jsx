import Button from '@components/Button/Button';
import styles from '../../styles.module.scss';
import cls from 'classnames';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import LoadingCart from '@/pages/Cart/components/Loading';
function CartSummary() {
    const {
        containerSummary,
        title,
        boxTotal,
        price,
        subTotal,
        totals,
        space,
        containerMethods,
        titleMethos,
        containerRight,
        boxImgMethods,
        imgMethods,
        textSecu
    } = styles;

    const { listProductCart, isLoading } = useContext(SideBarContext);

    const srcMethods = [
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/visa.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/master-card.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/paypal.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/american-express.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/maestro.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/bitcoin.jpeg'
    ];

    const total = listProductCart.reduce((acc, item) => {
        return (acc += item.total);
    }, 0);

    return (
        <>
            <div className={containerRight}>
                <div className={containerSummary}>
                    <div className={title}>CART TOTAL</div>
                    <div className={cls(boxTotal, subTotal)}>
                        <div>Subtotal</div>
                        <div className={price}>${total}</div>
                    </div>
                    <div className={cls(boxTotal, totals)}>
                        <div>TOTAL</div>
                        <div>${total.toFixed(2)}</div>
                    </div>

                    <Button content={'PROCEED TO CHECK OUT'} />
                    <div className={space} />
                    <Button content={'CONTINUE SHOPPING'} isPrinary={false} />

                    {isLoading && <LoadingCart />}
                </div>

                <div className={containerMethods}>
                    <div className={titleMethos}>
                        Guaranteed <span>safe</span> checkout
                    </div>

                    <div className={boxImgMethods}>
                        {srcMethods.map((src, index) => {
                            return (
                                <img
                                    src={src}
                                    alt='method'
                                    className={imgMethods}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className={textSecu}>Your Payment is 100% Secure</div>
            </div>
        </>
    );
}

export default CartSummary;
