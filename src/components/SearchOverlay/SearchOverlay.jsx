import React, { useContext, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { SideBarContext } from '@/contexts/SideBarProvider';
// 👇 CHÚ Ý: Kiểm tra kỹ tên file là productService hay productsService (có s hay không)
import { getProducts } from '@/apis/productsService';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import classNames from 'classnames';

// --- MOCK DATA ---
const MOCK_CATEGORIES = [
    {
        id: 1,
        name: 'ALL',
        count: 20,
        img: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-17.1-min-285x340.jpg'
    },
    {
        id: 2,
        name: 'MEN',
        count: 19,
        img: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-18.1-min-285x340.jpg'
    },
    {
        id: 3,
        name: 'PULLOVERS',
        count: 19,
        img: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-14.1-min-285x340.jpg'
    }
];
const TRENDING_SEARCHES = ['Shirt', 'Shoes', 'Cap', 'Skirt'];
// --------------------------------------------------

const SearchOverlay = () => {
    const { isOpen, setIsOpen, type, setType } = useContext(SideBarContext);
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const isSearchOpen = isOpen && type === 'search';

    useEffect(() => {
        if (!isSearchOpen) {
            setSearchValue('');
            setProducts([]);
        }
    }, [isSearchOpen]);

    const handleClose = () => {
        setIsOpen(false);
        setType('');
    };

    // --- HÀM SEARCH ĐÃ SỬA LỖI ---
    const handleSearch = async (value) => {
        setSearchValue(value);
        if (!value.trim()) {
            setProducts([]);
            return;
        }
        setIsLoading(true);
        try {
            const res = await getProducts({ search: value, limit: 4 });

            // 👇 LOGIC QUAN TRỌNG: Lấy đúng dữ liệu từ API
            // Kiểm tra xem dữ liệu nằm ở res hay res.data (tùy config axios)
            const responseData = res.data ? res.data : res;

            // Dựa vào JSON bạn gửi: mảng sản phẩm tên là 'contents'
            // Sử dụng || [] để đảm bảo không bao giờ bị undefined
            const listData = responseData.contents || [];

            setProducts(listData);
        } catch (error) {
            console.error('Lỗi tìm kiếm:', error);
            setProducts([]); // Nếu lỗi, set về rỗng để không crash web
        } finally {
            setIsLoading(false);
        }
    };

    const applySearchTerm = (term) => {
        setSearchValue(term);
        handleSearch(term);
    };

    const handleToDetail = (id) => {
        handleClose();
        navigate(`/product/${id}`);
    };

    return (
        <>
            <div
                className={classNames(styles.overlay, {
                    [styles.active]: isSearchOpen
                })}
                onClick={handleClose}
            ></div>

            <div
                className={classNames(styles.slideContainer, {
                    [styles.open]: isSearchOpen
                })}
            >
                <div className={styles.closeBtn} onClick={handleClose}>
                    <IoCloseOutline size={35} />
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title}>What Are You Looking For?</h2>

                    {/* === SEARCH INPUT SECTION === */}
                    <div className={styles.searchWrapper}>
                        <div className={styles.searchBox}>
                            <select className={styles.fakeSelect}>
                                <option>All Categories</option>
                            </select>
                            <input
                                type='text'
                                placeholder='Search for products...'
                                value={searchValue}
                                onChange={(e) => handleSearch(e.target.value)}
                                autoFocus={isSearchOpen}
                            />
                            <button className={styles.searchSubmitBtn}>
                                <IoSearchOutline size={20} /> SEARCH
                            </button>
                        </div>

                        {searchValue && (
                            <div className={styles.trending}>
                                <span>TRENDING SEARCHES:</span>
                                {TRENDING_SEARCHES.map((term, index) => (
                                    <span
                                        key={index}
                                        className={styles.trendTag}
                                        onClick={() => applySearchTerm(term)}
                                    >
                                        {term}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* === RESULTS AREA === */}
                    <div className={styles.resultsArea}>
                        {searchValue ? (
                            <>
                                {isLoading ? (
                                    <p className={styles.loadingText}>
                                        Searching...
                                    </p>
                                ) : (
                                    <>
                                        {/* 👇 Dùng dấu ? (Optional Chaining) để chống sập */}
                                        {products?.length > 0 && (
                                            <p className={styles.countText}>
                                                {products.length} PRODUCTS FOUND
                                            </p>
                                        )}

                                        <div className={styles.grid}>
                                            {/* 👇 Kiểm tra products trước khi map */}
                                            {products?.map((item) => {
                                                // Nếu item lỗi null thì bỏ qua luôn
                                                if (!item) return null;

                                                return (
                                                    <div
                                                        key={item._id}
                                                        className={styles.item}
                                                        onClick={() =>
                                                            handleToDetail(
                                                                item._id
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.imgWrap
                                                            }
                                                        >
                                                            <img
                                                                src={
                                                                    item
                                                                        .images?.[0] ||
                                                                    'https://via.placeholder.com/200'
                                                                }
                                                                alt={item.name}
                                                            />
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.info
                                                            }
                                                        >
                                                            <p
                                                                className={
                                                                    styles.catName
                                                                }
                                                            >
                                                                Fashion
                                                            </p>
                                                            <p
                                                                className={
                                                                    styles.name
                                                                }
                                                            >
                                                                {item.name}
                                                            </p>
                                                            <p
                                                                className={
                                                                    styles.price
                                                                }
                                                            >
                                                                {/* 👇 Format giá an toàn, nếu null thì hiện 0 */}
                                                                {item.price
                                                                    ? item.price.toLocaleString()
                                                                    : '0'}{' '}
                                                                đ
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {!isLoading &&
                                            products?.length === 0 && (
                                                <p className={styles.noResult}>
                                                    No products found.
                                                </p>
                                            )}
                                    </>
                                )}
                            </>
                        ) : (
                            // --- Popular Categories ---
                            <div className={styles.popularCategories}>
                                <h3 className={styles.subTitle}>
                                    Popular Categories
                                </h3>
                                <div className={styles.grid}>
                                    {MOCK_CATEGORIES.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className={styles.item}
                                        >
                                            <div className={styles.imgWrap}>
                                                <img
                                                    src={cat.img}
                                                    alt={cat.name}
                                                />
                                            </div>
                                            <div className={styles.info}>
                                                <p className={styles.name}>
                                                    {cat.name}
                                                </p>
                                                <p className={styles.count}>
                                                    {cat.count} products
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className={styles.viewAllBtn}
                                    onClick={() => navigate('/shop')}
                                >
                                    VIEW ALL CATEGORIES
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchOverlay;
