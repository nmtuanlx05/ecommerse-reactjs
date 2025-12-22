import { useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '@/contexts/StoreProvider';

import styles from './styles.module.scss';
import cls from 'classnames';

function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy hàm handleLogOut từ Context
    const { handleLogOut } = useContext(StoreContext);

    const handleNavigate = (path) => {
        navigate(path);
    };

    // Hàm kiểm tra Active
    const isActive = (path) => {
        // Nếu path truyền vào trùng khớp hoặc là cha của path hiện tại
        return (
            location.pathname === path ||
            location.pathname.startsWith(path + '/')
        );
    };

    // Helper tạo className cho menu item
    const getMenuClass = (path) => {
        return `${styles.menuItem} ${isActive(path) ? styles.active : ''}`;
    };

    return (
        <div className={styles.dashboardContainer}>
            {/* --- 1. SIDEBAR --- */}
            <div className={styles.sidebar}>
                {/* Logo */}
                <div
                    className={styles.logoContainer}
                    onClick={() => navigate('/admin')}
                >
                    <h2>MARSEILLE ADMIN</h2>
                </div>

                {/* Danh sách Menu */}
                <ul className={styles.menuList}>
                    <li
                        onClick={() => handleNavigate('/admin/users')}
                        className={getMenuClass('/admin/users')}
                    >
                        <span>👥</span> Manage Users
                    </li>

                    <li
                        onClick={() => handleNavigate('/admin/products')}
                        // Logic này giúp khi đang ở trang 'Thêm sản phẩm' thì menu cha vẫn sáng
                        className={`${styles.menuItem} ${
                            isActive('/admin/products') ||
                            isActive('/admin/product')
                                ? styles.active
                                : ''
                        }`}
                    >
                        <span>📦</span> Manage Products
                    </li>

                    <li
                        onClick={() => handleNavigate('/admin/orders')}
                        className={cls(styles.menuItem, {
                            [styles.active]: isActive('/admin/orders')
                        })}
                    >
                        <span className={styles.icon}>📜</span>
                        Manage Orders
                    </li>
                </ul>

                {/* Footer Sidebar */}
                <div className={styles.sidebarFooter}>
                    <button
                        onClick={() => handleNavigate('/')}
                        className={styles.btnReturn}
                    >
                        Return To Shop
                    </button>
                </div>
            </div>

            {/*  CONTENT AREA */}
            <div className={styles.contentArea}>
                {/* Navbar */}
                <div className={styles.navbar}>
                    <h4>Administration System</h4>

                    <div className={styles.adminInfo}>
                        <span>Hello, Admin</span>
                        <button
                            onClick={() => {
                                // Fallback nếu chưa setup context kịp
                                localStorage.clear();
                                navigate('/');
                            }}
                            className={styles.btnLogout}
                        >
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Main Content (Outlet) */}
                <div className={styles.mainContent}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
