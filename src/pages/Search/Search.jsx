import React, { useState, useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import { getProducts } from '@/apis/productsService';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
function Search() {
    const { setIsOpen } = useContext(SideBarContext);
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Hàm gọi API tìm kiếm
    const handleSearch = async () => {
        if (!searchValue.trim()) return;

        setIsLoading(true);
        try {
            // Gọi API với tham số search
            const res = await getProducts({ search: searchValue, limit: 10 });
            if (res && res.data) {
                setResults(res.data.data);
            }
        } catch (error) {
            console.log('Lỗi tìm kiếm:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Xử lý khi bấm Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleToDetail = (id) => {
        setIsOpen(false); // Đóng sidebar
        navigate(`/product/${id}`); // Chuyển sang trang chi tiết (hoặc shop)
    };
    return (
        <>
            <div className={styles.container}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                    }}
                >
                    <h3>SEARCH</h3>
                    <IoCloseOutline
                        size={24}
                        cursor='pointer'
                        onClick={() => setIsOpen(false)}
                    />
                </div>

                <div className={styles.searchBox}>
                    <input
                        type='text'
                        placeholder='Search for products...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <button onClick={handleSearch}>Find</button>
                </div>

                <div className={styles.resultList}>
                    {isLoading ? (
                        <div className={styles.loading}>Searching...</div>
                    ) : results.length > 0 ? (
                        results.map((item) => (
                            <div
                                key={item._id}
                                className={styles.item}
                                onClick={() => handleToDetail(item._id)}
                            >
                                <img
                                    src={
                                        item.images?.[0] ||
                                        'https://via.placeholder.com/60'
                                    }
                                    alt={item.name}
                                />
                                <div className={styles.info}>
                                    <div className={styles.name}>
                                        {item.name}
                                    </div>
                                    <div className={styles.price}>
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(item.price)}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : searchValue && !isLoading ? (
                        <div className={styles.empty}>No products found.</div>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Search;
