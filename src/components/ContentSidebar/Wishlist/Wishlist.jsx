import HeaderSideBar from '@components/ContentSidebar/components/HeaderSideBar/HeaderSideBar';
import styles from './styles.module.scss';
import { CiHeart } from 'react-icons/ci';
import ItemProduct from '@components/ContentSidebar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { useContext, useEffect } from 'react';

function Wishlist() {
    const { container, boxBtn } = styles;
    // 1. Lấy danh sách wishlist và hàm gọi API từ Context
    const { listWishlist, handleGetListProductsCart, userId } =
        useContext(SideBarContext);

    // 2. Gọi API lấy dữ liệu khi component được render
    useEffect(() => {
        if (userId) {
            handleGetListProductsCart(userId, 'wishlist');
        }
    }, [userId]);

    return (
        <div className={container}>
            <div>
                <HeaderSideBar icon={<CiHeart size={30} />} title='WISHLIST' />
                {/* <ItemProduct /> */}
                {/* Code mới: Lặp qua danh sách để render */}
                <div
                    style={{
                        maxHeight: 'calc(100vh - 200px)',
                        overflowY: 'auto'
                    }}
                >
                    {listWishlist && listWishlist.length > 0 ? (
                        listWishlist.map((item, index) => (
                            <ItemProduct
                                key={index}
                                // Truyền dữ liệu vào props
                                src={item.images?.[0]}
                                nameProduct={item.name}
                                priceProduct={item.price}
                                skuProuct={item.sku}
                                sizeProduct={item.size}
                                quantity={1}
                                productId={item.productId}
                                userId={userId}
                                type='wishlist' // Để ItemProduct biết là đang ở Wishlist
                            />
                        ))
                    ) : (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '20px',
                                color: '#666'
                            }}
                        >
                            No favorite product yet.
                        </div>
                    )}
                </div>
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
