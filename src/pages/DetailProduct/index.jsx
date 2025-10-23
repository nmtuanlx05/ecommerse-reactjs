import MyHeader from '@components/Header/Header';
import MainLayout from '@components/MainLayout/MainLayout';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { PiShoppingCartSimpleThin } from 'react-icons/pi';
import { TfiReload } from 'react-icons/tfi';
import { CiHeart } from 'react-icons/ci';
import AccordionMenu from '@components/AccordionMenu/Accordion';
import { useContext, useEffect, useState } from 'react';
import InformationProduct from '@/pages/DetailProduct/components/Information';
import ReviewProduct from '@/pages/DetailProduct/components/Review';
import MyFooter from '@components/Footer/Footer';
import SliderCommon from '@components/SliderCommon/SliderCommon';
import ReactImageMagnifier from 'simple-image-magnifier/react';
import cls from 'classnames';
import { getDetailProduct } from '@/apis/productsService';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';
import { getRelatedProduct } from '@/apis/productsService';
import { handleAddProductToCartCommon } from '@/utils/helper';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { ToastContext } from '@/contexts/ToastProvider';
import Cookies from 'js-cookie';
import { addProductToCart } from '@/apis/cartService';
const INCREA = 'increasement';
const DECREA = 'decreasement';
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
        info,
        active,
        clear,
        activeDisabled,
        loading,
        isEmpty
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

    const [sizeSelected, setSizeSlected] = useState('');

    const [quantity, setQuantity] = useState(1);

    const [data, setData] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const [isLoadingBtnBuyNow, setIsLoadingBtnBuyNow] = useState(false);

    const [relatedData, setRelatedData] = useState([]);

    const param = useParams();

    const navigate = useNavigate();

    const { setIsOpen, setType, handleGetListProductsCart } =
        useContext(SideBarContext);

    const { toast } = useContext(ToastContext);

    const userId = Cookies.get('userId');

    const dataAccordionMenu = [
        {
            id: 1,
            titleMenu: 'ADDITIONAL INFORMATION',
            content: <InformationProduct />
        },
        {
            id: 2,
            titleMenu: 'REVIEW (0)',
            content: <ReviewProduct />
        }
    ];

    const handleSetMenuSelected = (id) => {
        setMenuSelected((prev) => (prev === id ? null : id));
    };

    const handleZoomImage = (src) => {
        return (
            <ReactImageMagnifier
                srcPreview={src}
                srcOriginal={src}
                width={295}
                height={350}
            />
        );
    };

    const handleSelectedSize = (size) => {
        setSizeSlected(size);
    };

    const handleClearSize = () => {
        setSizeSlected('');
    };

    const handleSetQuantity = (type) => {
        if (quantity < 1) return;
        setQuantity((prev) =>
            type === INCREA ? (prev += 1) : quantity === 1 ? 1 : (prev -= 1)
        );
    };

    const fetchDataDetail = async (id) => {
        setIsLoading(true);
        try {
            const data = await getDetailProduct(id);
            setData(data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Error loading data');
            setData();
            setIsLoading(false);
        }
    };

    const fetchDataRelatedProduct = async (id) => {
        setIsLoading(true);
        try {
            const data = await getRelatedProduct(id);
            setRelatedData(data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Error loading data');
            setRelatedData([]);
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        handleAddProductToCartCommon(
            userId,
            setIsOpen,
            setType,
            toast,
            sizeSelected,
            param.id,
            quantity,
            setIsLoadingBtn,
            handleGetListProductsCart
        );
    };

    const handleBuyNow = () => {
        const data = {
            userId,
            productId: param.id,
            quantity: quantity,
            size: sizeSelected
        };
        setIsLoadingBtnBuyNow(true);
        addProductToCart(data)
            .then((res) => {
                toast.success('Add Product to cart successfully!');
                setIsLoadingBtnBuyNow(false);
                navigate('/cart');
            })
            .catch((error) => {
                toast.error('Add Product to cart failed......!');
                setIsLoadingBtnBuyNow(false);
            });
    };

    useEffect(() => {
        if (param.id) {
            fetchDataDetail(param.id);
            fetchDataRelatedProduct(param.id);
        }
    }, [param]);

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

                    {isLoading ? (
                        <div className={loading}>
                            <LoadingTextCommon />
                        </div>
                    ) : (
                        <>
                            {!data ? (
                                <div className={isEmpty}>
                                    <p>No Result </p>
                                    <div>
                                        <Button
                                            content={'Back to Our Shop'}
                                            onClick={() => naviagte('/shop')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className={contentSection}>
                                    <div className={imgBox}>
                                        {data?.images.map((src) =>
                                            handleZoomImage(src)
                                        )}
                                    </div>

                                    <div className={infoBox}>
                                        <h1>{data?.name}</h1>
                                        <p className={price}>
                                            ${data?.price}
                                        </p>{' '}
                                        <p className={description}>
                                            {data?.description}
                                        </p>
                                        <p className={titleSize}>
                                            Size {sizeSelected}
                                        </p>
                                        <div className={boxSize}>
                                            {data?.size.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={cls(size, {
                                                        [active]:
                                                            sizeSelected ===
                                                            item.name
                                                    })}
                                                    onClick={() =>
                                                        handleSelectedSize(
                                                            item.name
                                                        )
                                                    }
                                                >
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>
                                        {sizeSelected && (
                                            <p
                                                className={clear}
                                                onClick={handleClearSize}
                                            >
                                                clear
                                            </p>
                                        )}
                                        <div className={functionInfo}>
                                            <div className={incrementAmount}>
                                                <div
                                                    onClick={() =>
                                                        handleSetQuantity(
                                                            DECREA
                                                        )
                                                    }
                                                >
                                                    -
                                                </div>
                                                <div>{quantity}</div>
                                                <div
                                                    onClick={() =>
                                                        handleSetQuantity(
                                                            INCREA
                                                        )
                                                    }
                                                >
                                                    +
                                                </div>
                                            </div>

                                            <div className={boxBtn}>
                                                <Button
                                                    content={
                                                        isLoadingBtn ? (
                                                            <LoadingTextCommon />
                                                        ) : (
                                                            <div>
                                                                {' '}
                                                                <PiShoppingCartSimpleThin />{' '}
                                                                ADD TO CART
                                                            </div>
                                                        )
                                                    }
                                                    customClassname={
                                                        !sizeSelected &&
                                                        activeDisabled
                                                    }
                                                    style={{
                                                        height: '42px'
                                                    }}
                                                    onClick={handleAdd}
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
                                                    isLoadingBtnBuyNow ? (
                                                        <LoadingTextCommon />
                                                    ) : (
                                                        <div>
                                                            {' '}
                                                            <PiShoppingCartSimpleThin />{' '}
                                                            BUY NOW
                                                        </div>
                                                    )
                                                }
                                                customClassname={
                                                    !sizeSelected &&
                                                    activeDisabled
                                                }
                                                style={{ height: '42px' }}
                                                onClick={handleBuyNow}
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
                                                Guaranteed <span>safe</span>{' '}
                                                checkout
                                            </div>

                                            <div className={boxImgMethods}>
                                                {srcMethods.map(
                                                    (src, index) => {
                                                        return (
                                                            <img
                                                                src={src}
                                                                alt='method'
                                                                className={
                                                                    imgMethods
                                                                }
                                                                key={index}
                                                            />
                                                        );
                                                    }
                                                )}
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
                                        {dataAccordionMenu.map(
                                            (item, index) => (
                                                <AccordionMenu
                                                    titleMenu={item.titleMenu}
                                                    contentJsx={item.content}
                                                    key={index}
                                                    onClick={() =>
                                                        handleSetMenuSelected(
                                                            item.id
                                                        )
                                                    }
                                                    isSelected={
                                                        menuSelected === item.id
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {relatedData.length ? (
                        <div>
                            <h2>Related products</h2>

                            <SliderCommon
                                data={relatedData}
                                isProductItem={true}
                                showItem={4}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </MainLayout>
            </div>

            <MyFooter />
        </div>
    );
}

export default DetailProduct;
