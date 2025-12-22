import { createContext, useEffect, useState } from 'react';
import { getCart } from '@/apis/cartService';
import Cookies from 'js-cookie';

export const SideBarContext = createContext();
export const SideBarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [listProductCart, setListProductCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [detailProduct, setDetailProduct] = useState(null);

    const [listWishlist, setListWishlist] = useState([]);

    const userId = Cookies.get('userId');
    const handleGetListProductsCart = (userId, type) => {
        // type có thể là 'cart' hoặc 'wishlist'
        if (userId && type) {
            setIsLoading(true);

            // Gọi API và truyền type vào (để backend biết lấy bảng nào)
            getCart(userId, type)
                .then((res) => {
                    // Nếu lấy Giỏ hàng -> Lưu vào listProductCart
                    if (type === 'cart') {
                        setListProductCart(res.data.data);
                    }
                    // Nếu lấy Wishlist -> Lưu vào listWishlist
                    else if (type === 'wishlist') {
                        setListWishlist(res.data.data);
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('Lỗi lấy dữ liệu:', err);
                    // Reset mảng về rỗng nếu lỗi
                    if (type === 'cart') setListProductCart([]);
                    if (type === 'wishlist') setListWishlist([]);
                    setIsLoading(false);
                });
        }
    };

    return (
        <SideBarContext.Provider
            value={{
                isOpen,
                setIsOpen,
                type,
                setType,
                handleGetListProductsCart,
                listProductCart,
                isLoading,
                setIsLoading,
                userId,
                detailProduct,
                setDetailProduct,
                setListProductCart,
                listWishlist,
                setListWishlist
            }}
        >
            {children}
        </SideBarContext.Provider>
    );
};
