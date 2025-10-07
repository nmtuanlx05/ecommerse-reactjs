import { useContext, useState } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import styles from './styles.module.scss';
import SliderCommon from '@components/SliderCommon/SliderCommon';
import SelectBox from '@/pages/OurShop/components/SelectBox';
import Button from '@components/Button/Button';
import { PiShoppingCartSimpleThin } from 'react-icons/pi';
import { TfiReload } from 'react-icons/tfi';
import { SlHeart } from 'react-icons/sl';
import { FaXTwitter } from 'react-icons/fa6';
import { RiFacebookFill } from 'react-icons/ri';
import { FaVk } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaSkype } from 'react-icons/fa';
import cls from 'classnames';
import { addProductToCart } from '@/apis/cartService';

function DetailProduct() {
    const {
        container,
        title,
        price,
        des,
        boxSize,
        size,
        label,
        boxAddToCart,
        boxOr,
        line,
        or,
        boxAddOther,
        boxFooter,
        isActive
    } = styles;

    const [chooseSize, setChooseSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const {
        detailProduct,
        userId,
        setType,
        handleGetListProductsCart,
        setIsLoading,
        setIsOpen
    } = useContext(SideBarContext);
    const showOptions = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' }
    ];

    const handleGetSize = (value) => {
        setChooseSize(value);
    };

    const handleDeleteClearSize = () => {
        setChooseSize('');
    };

    const handleGetQuantity = (value) => {
        setQuantity(value);
    };

    const handleAddToCart = () => {
        const data = {
            userId,
            productId: detailProduct._id,
            quantity,
            size: chooseSize,
            isMultiple: true
        };
        setIsOpen(false);
        setIsLoading(true);
        addProductToCart(data)
            .then((res) => {
                setIsOpen(true);
                setType('cart');
                handleGetListProductsCart(userId, 'cart');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={container}>
            <SliderCommon data={detailProduct.images} />
            <div className={title}>{detailProduct.name}</div>
            <div className={price}>${detailProduct.price}</div>
            <div className={des}>{detailProduct.description}</div>

            <div className={label}>Size {chooseSize}</div>
            <div className={boxSize}>
                {detailProduct.size.map((item, index) => (
                    <div
                        className={cls(size, {
                            [isActive]: item.name === chooseSize
                        })}
                        key={index}
                        onClick={() => handleGetSize(item.name)}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            {chooseSize && (
                <div
                    onClick={handleDeleteClearSize}
                    style={{
                        fontSize: '12px',
                        marginTop: '3px',
                        cursor: 'pointer'
                    }}
                >
                    clear
                </div>
            )}
            <div className={boxAddToCart}>
                <SelectBox
                    options={showOptions}
                    type='show'
                    defautValue={quantity}
                    getValue={handleGetQuantity}
                />
                <div>
                    <Button
                        onClick={handleAddToCart}
                        content={
                            <div>
                                <PiShoppingCartSimpleThin /> ADD TO CART
                            </div>
                        }
                    />
                </div>
            </div>

            <div className={boxOr}>
                <div className={line} />
                <div className={or}>OR</div>
                <div className={line} />
            </div>

            <Button
                content={
                    <div>
                        <PiShoppingCartSimpleThin /> SELECT OPTIONS
                    </div>
                }
            />

            <div className={boxAddOther}>
                <TfiReload size={16} />
                <div>Add to compare</div>
            </div>

            <div className={boxAddOther}>
                <SlHeart size={18} />
                <div>Add to wishlist</div>
            </div>

            <div className={boxFooter}>
                SKU: <span>12349</span>
            </div>

            <div className={boxFooter}>
                Caterory: <span>Pullovers</span>
            </div>

            <div className={boxFooter}>
                Estimated delivery: <span>3 - 5 days</span>
            </div>

            <div className={boxFooter}>
                Share:
                <span>
                    <FaXTwitter />
                    <RiFacebookFill />
                    <FaVk />
                    <FaPinterestP />
                    <CiMail />
                    <FaLinkedinIn />
                    <FaWhatsapp />
                    <FaSkype />
                </span>
            </div>
        </div>
    );
}

export default DetailProduct;
