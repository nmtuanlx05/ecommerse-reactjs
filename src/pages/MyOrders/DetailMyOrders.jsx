import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './DetailOrders.module.scss'; // File style mới
import { getDetailOrder } from '@/apis/orderService';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/MainLayout/MainLayout';
import MyFooter from '@components/Footer/Footer';
import Button from '@components/Button/Button';
import classNames from 'classnames';
import { IoArrowBack } from 'react-icons/io5';
function DetailMyOrders() {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getDetailOrder(id);
                if (res && res.data) {
                    setOrder(res.data.data);
                }
            } catch (error) {
                console.error('Lỗi lấy chi tiết đơn:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const getStatusClass = (status) => {
        return styles[status] || styles.default;
    };

    return (
        <>
            <MyHeader />
            <MainLayout>
                <div className={styles.container}>
                    <div className={styles.headerSection}>
                        <button
                            className={styles.btnBack}
                            onClick={() => navigate('/my-orders')}
                        >
                            <IoArrowBack /> Back to Orders
                        </button>
                        <h1 className={styles.title}>Order Details</h1>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>Loading details...</div>
                    ) : !order ? (
                        <div className={styles.loading}>Order not found</div>
                    ) : (
                        <div className={styles.contentWrapper}>
                            {/* 1. THÔNG TIN CHUNG & TRẠNG THÁI */}
                            <div className={styles.topInfo}>
                                <div className={styles.infoGroup}>
                                    <span className={styles.label}>
                                        Order ID:
                                    </span>
                                    <span className={styles.value}>
                                        #{order._id.toUpperCase()}
                                    </span>
                                </div>
                                <div className={styles.infoGroup}>
                                    <span className={styles.label}>Date:</span>
                                    <span className={styles.value}>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString('vi-VN')}
                                    </span>
                                </div>
                                <div className={styles.statusBadge}>
                                    <span
                                        className={classNames(
                                            styles.badge,
                                            getStatusClass(order.status)
                                        )}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.gridLayout}>
                                {/* 2. THÔNG TIN GIAO HÀNG (CỘT TRÁI) */}
                                <div className={styles.card}>
                                    <h3>Shipping Address</h3>
                                    <div className={styles.addressInfo}>
                                        <p>
                                            <strong>Name:</strong>{' '}
                                            {order.firstName} {order.lastName}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong>{' '}
                                            {order.phone}
                                        </p>
                                        <p>
                                            <strong>Email:</strong>{' '}
                                            {order.email}
                                        </p>
                                        <p>
                                            <strong>Address:</strong>{' '}
                                            {order.street}, {order.state},{' '}
                                            {order.cities}
                                        </p>
                                        <p>
                                            <strong>Country:</strong>{' '}
                                            {order.country}
                                        </p>
                                    </div>
                                </div>

                                {/* 3. DANH SÁCH SẢN PHẨM (CỘT PHẢI) */}
                                <div className={styles.card}>
                                    <h3>Order Items</h3>
                                    <div className={styles.itemList}>
                                        {order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className={styles.itemRow}
                                            >
                                                {/* --- BẮT ĐẦU ĐOẠN SỬA --- */}
                                                {/* Logic: Có ảnh thì hiện ảnh, không có thì hiện icon */}
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className={
                                                            styles.productImage
                                                        }
                                                        // Nếu link ảnh bị lỗi thì tự động chuyển về ảnh mặc định hoặc ẩn đi
                                                        onError={(e) => {
                                                            e.target.onerror =
                                                                null;
                                                            e.target.src =
                                                                'https://via.placeholder.com/70?text=No+Img';
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        className={
                                                            styles.imgPlaceholder
                                                        }
                                                    >
                                                        <span>📦</span>
                                                    </div>
                                                )}
                                                {/* --- KẾT THÚC ĐOẠN SỬA --- */}

                                                <div
                                                    className={
                                                        styles.itemDetails
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.itemName
                                                        }
                                                    >
                                                        {/* Ưu tiên hiện tên đã lưu trong đơn, nếu không có mới hiện ID */}
                                                        {item.name ||
                                                            `Product ID: ${item.productId}`}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.itemMeta
                                                        }
                                                    >
                                                        <span>
                                                            Size:{' '}
                                                            {item.size || 'N/A'}
                                                        </span>
                                                        <span>
                                                            Quantity:{' '}
                                                            {item.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className={styles.itemPrice}
                                                >
                                                    {item.price} $
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.divider}></div>

                                    <div className={styles.totalSection}>
                                        <div className={styles.row}>
                                            <span>Subtotal:</span>
                                            <span>{order.totalAmount} $</span>
                                        </div>
                                        <div className={styles.row}>
                                            <span>Shipping Fee:</span>
                                            <span>Free</span>
                                        </div>
                                        <div
                                            className={`${styles.row} ${styles.finalTotal}`}
                                        >
                                            <span>Total:</span>
                                            <span>{order.totalAmount} $</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </MainLayout>
            <MyFooter />
        </>
    );
}

export default DetailMyOrders;
