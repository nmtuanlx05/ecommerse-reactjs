// AdminUsers.jsx
import React, { useEffect, useState } from 'react';
import axiosClient from '@/apis/axiosClient.js';
import styles from './styles.module.scss';
import cls from 'classnames'; // Cài đặt: npm install classnames (nếu chưa có)

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    // 1. Vừa vào trang là gọi API lấy danh sách ngay
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axiosClient.get('/user/get-all');
            setUsers(res.data.data || []);
        } catch (error) {
            console.error('Lỗi lấy user:', error);
        }
    };

    // 2. Hàm xử lý nút bấm Thăng Chức / Hạ Chức
    const handleUpdateRole = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'member' : 'admin';
        const actionText =
            currentRole === 'admin'
                ? 'hạ chức xuống Member'
                : 'thăng chức lên Admin';

        if (
            window.confirm(`Bạn có chắc muốn ${actionText} cho người dùng này?`)
        ) {
            try {
                await axiosClient.put(`/user/update-role/${userId}`, {
                    role: newRole
                });

                fetchUsers(); // Load lại danh sách
                alert('Cập nhật thành công!');
            } catch (error) {
                alert(
                    'Lỗi: ' + (error.response?.data?.message || error.message)
                );
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1>Users List Management</h1>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Email / Username</th>
                        <th>Current Position</th>
                        <th>Decision</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>
                                    {/* Sử dụng cls để kẹp điều kiện class động */}
                                    <span
                                        className={cls(styles.roleText, {
                                            [styles.admin]:
                                                user.role === 'admin',
                                            [styles.member]:
                                                user.role !== 'admin'
                                        })}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className={styles.actionBtn}
                                        onClick={() =>
                                            handleUpdateRole(
                                                user._id,
                                                user.role
                                            )
                                        }
                                        title={
                                            user.role === 'admin'
                                                ? 'Demote to Member'
                                                : 'Promote to Admin'
                                        }
                                    >
                                        {user.role === 'admin'
                                            ? '⬇️ Demote Member'
                                            : '⬆️ Promote Admin'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan='3'
                                style={{ textAlign: 'center', padding: '20px' }}
                            >
                                Không có người dùng nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
