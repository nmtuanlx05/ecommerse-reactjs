import MyHeader from '@components/Header/Header';
import MainLayout from '@components/MainLayout/MainLayout';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { PiShoppingCartSimpleThin } from 'react-icons/pi';
import { TfiReload } from 'react-icons/tfi';
import { CiHeart } from 'react-icons/ci';
import AccordionMenu from '@components/AccordionMenu/Accordion';
import { useState } from 'react';

function DetailProduct() {
    const {
        container,
        navigateSection,
        contentSection,
        imgBox,
        infoBox,
        price,
        description,
        boxSize,
        size,
        titleSize,
        functionInfo,
        boxBtn,
        incrementAmount,
        orSection,
        line,
        addFunc,
        containerMethods,
        titleMethos,
        boxImgMethods,
        imgMethods,
        textSecu,
        info
    } = styles;
    const srcMethods = [
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/visa.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/master-card.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/paypal.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/american-express.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/maestro.jpeg',
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/bitcoin.jpeg'
    ];

    const [menuSelected, setMenuSelected] = useState(1);
    const dataAccordionMenu = [
        {
            id: 1,
            titleMenu: 'ADDITIONAL INFORMATION',
            content: <div>CONTENT ADDITIONAL</div>
        },
        {
            id: 2,
            titleMenu: 'REVIEW (0)',
            content: <div>CONTENT REVIEW</div>
        }
    ];

    const handleSetMenuSelected = (id) => {
        setMenuSelected((prev) => (prev === id ? null : id));
    };

    return (
        <div>
            <MyHeader />
            <div className={container}>
                <MainLayout>
                    <div className={navigateSection}>
                        <div>Home {'>'} Men</div>
                        <div style={{ cursor: 'pointer' }}>
                            {'<'} Return to previous page
                        </div>
                    </div>

                    <div className={contentSection}>
                        <div className={imgBox}>
                            <img
                                src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
                                alt='Anh1'
                            />
                            <img
                                src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
                                alt='Anh1'
                            />
                            <img
                                src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
                                alt='Anh1'
                            />
                            <img
                                src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
                                alt='Anh1'
                            />
                        </div>

                        <div className={infoBox}>
                            <h1>Title Product</h1>
                            <p className={price}>$1,879.99</p>{' '}
                            <p className={description}>
                                Amet, elit tellus, nisi odio velit ut. Euismod
                                sit arcu, quisque arcu purus orci leo.
                            </p>
                            <p className={titleSize}>Size</p>
                            <div className={boxSize}>
                                <div className={size}>S</div>
                                <div className={size}>M</div>
                                <div className={size}>L</div>
                            </div>
                            <div className={functionInfo}>
                                <div className={incrementAmount}>
                                    <div>-</div>
                                    <div>1</div>
                                    <div>+</div>
                                </div>

                                <div className={boxBtn}>
                                    <Button
                                        content={
                                            <div>
                                                {' '}
                                                <PiShoppingCartSimpleThin /> ADD
                                                TO CART
                                            </div>
                                        }
                                        style={{ height: '43px' }}
                                    />
                                </div>
                            </div>
                            <div className={orSection}>
                                <div className={line} />
                                <div>OR</div>
                                <div className={line} />
                            </div>
                            <div>
                                <Button
                                    content={
                                        <div>
                                            {' '}
                                            <PiShoppingCartSimpleThin /> BUY NOW
                                        </div>
                                    }
                                    style={{ height: '43px' }}
                                />
                            </div>
                            <div className={addFunc}>
                                <div>
                                    <CiHeart size={28} />
                                </div>
                                <div>
                                    <TfiReload size={22} />
                                </div>
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
                            <div className={textSecu}>
                                Your Payment is 100% Secure
                            </div>
                            <div className={info}>
                                <div>
                                    Brand: <span>Brand 03</span>
                                </div>
                                <div>
                                    SKU: <span>12345</span>
                                </div>
                                <div>
                                    Category: <span>Men</span>
                                </div>
                            </div>
                            {dataAccordionMenu.map((item, index) => (
                                <AccordionMenu
                                    titleMenu={item.titleMenu}
                                    contentJsx={item.content}
                                    key={index}
                                    onClick={() =>
                                        handleSetMenuSelected(item.id)
                                    }
                                    isSelected={menuSelected === item.id}
                                />
                            ))}
                        </div>
                    </div>
                </MainLayout>
            </div>
        </div>
    );
}

export default DetailProduct;
