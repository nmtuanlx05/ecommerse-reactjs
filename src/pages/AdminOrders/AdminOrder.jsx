import React, { useEffect, useState } from 'react';
import axiosClient from '@/apis/axiosClient';
import styles from './styles.module.scss';
import cls from 'classnames';
import { toast } from 'react-toastify';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Hàm gọi API lấy danh sách
    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            // Gọi vào route admin mới tạo ở phần Backend
            const res = await axiosClient.get('/admin/orders');
            // Lưu ý: Đường dẫn API phụ thuộc vào cách bạn config base URL trong axiosClient
            // Nếu axiosClient đã có base /api/v1 thì chỉ cần get('/orders/admin/orders')

            setOrders(res.data.data || []);
        } catch (error) {
            console.error('Lỗi lấy đơn hàng:', error);
            toast.error('Không thể tải danh sách đơn hàng');
        } finally {
            setIsLoading(false);
        }
    };

    // Gọi API khi vừa vào trang
    useEffect(() => {
        fetchOrders();
    }, []);

    // 2. Hàm xử lý thay đổi trạng thái (Dropdown)
    const handleStatusChange = async (orderId, newStatus) => {
        // Hỏi xác nhận trước khi đổi
        if (
            !window.confirm(
                `Bạn có chắc muốn đổi trạng thái đơn hàng này sang "${newStatus}"?`
            )
        ) {
            return; // Nếu bấm Cancel thì dừng lại, không gọi API
        }

        try {
            await axiosClient.put(`/admin/orders/${orderId}`, {
                status: newStatus
            });

            toast.success('Cập nhật trạng thái thành công!');
            fetchOrders(); // Load lại bảng để thấy dữ liệu mới
        } catch (error) {
            console.error(error);
            toast.error('Lỗi khi cập nhật trạng thái');
        }
    };

    // Hàm render màu sắc cho trạng thái
    const getStatusClass = (status) => {
        return styles[status] || styles.pending;
    };

    return (
        <div className={styles.container}>
            <h1>Manage Orders</h1>

            {isLoading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    Loading...
                </div>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Code (#ID)</th>
                            <th>Customers</th>
                            <th>Address</th>
                            <th>Total Price</th>
                            <th>Date</th>
                            <th>Current Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id}>
                                    {/* Cột 1: Mã đơn (Lấy 6 ký tự cuối cho gọn) */}
                                    <td style={{ fontWeight: 'bold' }}>
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>

                                    {/* Cột 2: Thông tin khách */}
                                    <td>
                                        <div>
                                            {order.firstName} {order.lastName}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                color: '#666'
                                            }}
                                        >
                                            {order.phone}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                color: '#666'
                                            }}
                                        >
                                            {order.email}
                                        </div>
                                    </td>

                                    {/* Cột 3: Địa chỉ */}
                                    <td style={{ maxWidth: '200px' }}>
                                        {order.street}, {order.state},{' '}
                                        {order.cities}
                                    </td>

                                    {/* Cột 4: Tổng tiền */}
                                    <td
                                        style={{
                                            color: '#e74c3c',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {order.totalAmount?.toLocaleString()} $
                                    </td>

                                    {/* Cột 5: Ngày đặt */}
                                    <td>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString('vi-VN')}
                                    </td>

                                    {/* Cột 6: Badge trạng thái */}
                                    <td>
                                        <span
                                            className={cls(
                                                styles.badge,
                                                getStatusClass(order.status)
                                            )}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    {/* Cột 7: Dropdown thay đổi trạng thái */}
                                    <td>
                                        <select
                                            className={styles.selectStatus}
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                            disabled={
                                                order.status === 'cancelled'
                                            } // Nếu hủy rồi thì khóa lại
                                        >
                                            <option value='pending'>
                                                Pending
                                            </option>
                                            <option value='paid'>Paid</option>
                                            <option value='shipping'>
                                                Shipping
                                            </option>
                                            <option value='completed'>
                                                Completed
                                            </option>
                                            <option value='cancelled'>
                                                Cancelled
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan='7'
                                    style={{
                                        textAlign: 'center',
                                        padding: '30px'
                                    }}
                                >
                                    Not Orders Yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminOrders;
