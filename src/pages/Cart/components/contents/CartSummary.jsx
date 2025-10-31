import Button from '@components/Button/Button';
import styles from '../../styles.module.scss';
import cls from 'classnames';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import LoadingCart from '@/pages/Cart/components/Loading';
import { StepperContext } from '@/contexts/SteperProvider';
import PaymentMethods from '@components/PaymentMethods/PaymentMethods';
import { handleTotalPrice } from '@/utils/helper';
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
    const { currentStep, setCurrentStep } = useContext(StepperContext);

    const srcMethods = [
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/visa.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/master-card.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/paypal.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/american-express.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/maestro.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/bitcoin.jpeg'
    ];

    const handleProcessCheckout = () => {
        setCurrentStep(2);
    };

    return (
        <>
            <div className={containerRight}>
                <div className={containerSummary}>
                    <div className={title}>CART TOTAL</div>
                    <div className={cls(boxTotal, subTotal)}>
                        <div>Subtotal</div>
                        <div className={price}>
                            ${handleTotalPrice(listProductCart)}
                        </div>
                    </div>
                    <div className={cls(boxTotal, totals)}>
                        <div>TOTAL</div>
                        <div>
                            ${handleTotalPrice(listProductCart).toFixed(2)}
                        </div>
                    </div>

                    <Button
                        content={'PROCEED TO CHECK OUT'}
                        onClick={handleProcessCheckout}
                    />
                    <div className={space} />
                    <Button content={'CONTINUE SHOPPING'} isPrinary={false} />

                    {isLoading && <LoadingCart />}
                </div>

                <PaymentMethods />
            </div>
        </>
    );
}

export default CartSummary;
