import HeaderSideBar from '@components/ContentSidebar/components/HeaderSideBar/HeaderSideBar';
import styles from './styles.module.scss';
import { CiHeart } from 'react-icons/ci';
import ItemProduct from '@components/ContentSidebar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';

function Wishlist() {
    const { container,boxBtn  } = styles;

    return (
        <div className={container}>
            <div>
                <HeaderSideBar icon={<CiHeart size={30} />} title='WISHLIST' />
                <ItemProduct />
            </div>
            <div className={boxBtn}>
                <Button
                    content={'VIEW WISHLIST'}
                    className={styles.wishListBtn}
                />
                <Button
                    content={'ADD ALL TO CART'}
                    isPrinary={false}
                    className={styles.wishListBtn}
                />
            </div>
        </div>
    );
}

export default Wishlist;
