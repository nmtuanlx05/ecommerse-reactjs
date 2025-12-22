import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getMyOrders } from '@/apis/orderService';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/MainLayout/MainLayout';
import MyFooter from '@components/Footer/Footer';
import Button from '@components/Button/Button';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const res = await getMyOrders();
                if (res && res.data) {
                    setOrders(res.data.data);
                }
            } catch (error) {
                console.log('Lỗi lấy đơn hàng:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Hàm render màu badge theo trạng thái
    const getStatusClass = (status) => {
        return styles[status] || styles.default;
    };

    return (
        <>
            <MyHeader />
            <MainLayout>
                <div className={styles.container}>
                    <h1 className={styles.title}>My Orders</h1>

                    {isLoading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : orders.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>You don't have orders yet.</p>
                            <div className={styles.btn}>
                                <Button
                                    onClick={() => navigate('/shop')}
                                    content={'Buy Now'}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.tableResponsive}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Code (#ID)</th>
                                        <th>Date</th>
                                        <th>Products</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Activity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className={styles.orderId}>
                                                #
                                                {order._id
                                                    .slice(-6)
                                                    .toUpperCase()}
                                            </td>
                                            <td>
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString('vi-VN')}
                                            </td>
                                            <td className={styles.productInfo}>
                                                <div
                                                    className={
                                                        styles.productName
                                                    }
                                                >
                                                    {order.items[0]?.name ||
                                                        'Product undefined'}
                                                </div>
                                                {order.items.length > 1 && (
                                                    <span
                                                        className={
                                                            styles.moreItems
                                                        }
                                                    >
                                                        (+
                                                        {order.items.length -
                                                            1}{' '}
                                                        Other Products)
                                                    </span>
                                                )}
                                            </td>
                                            <td className={styles.totalPrice}>
                                                {order.totalAmount} $
                                            </td>
                                            <td>
                                                <span
                                                    className={classNames(
                                                        styles.badge,
                                                        getStatusClass(
                                                            order.status
                                                        )
                                                    )}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className={styles.btnDetail}
                                                    onClick={() =>
                                                        navigate(
                                                            `/my-orders/${order._id}`
                                                        )
                                                    }
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </MainLayout>
            <MyFooter />
        </>
    );
};

export default MyOrders;
