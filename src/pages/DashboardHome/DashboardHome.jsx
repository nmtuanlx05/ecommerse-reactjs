import React from 'react';
import styles from './styles.module.scss';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
function DashboardHome() {
    const chartData = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 5000 },
        { name: 'Apr', revenue: 2780 },
        { name: 'May', revenue: 1890 },
        { name: 'Jun', revenue: 2390 },
        { name: 'Jul', revenue: 3490 }
    ];

    const recentOrders = [
        {
            id: '#ORD-001',
            user: 'Tuan Manh',
            price: '1,200,000đ',
            status: 'Completed'
        },
        {
            id: '#ORD-002',
            user: 'Nguyen Van A',
            price: '500,000đ',
            status: 'Pending'
        },
        {
            id: '#ORD-003',
            user: 'Le Thi B',
            price: '2,350,000đ',
            status: 'Completed'
        },
        {
            id: '#ORD-004',
            user: 'Tran Van C',
            price: '150,000đ',
            status: 'Cancelled'
        },
        {
            id: '#ORD-005',
            user: 'Pham Thi D',
            price: '890,000đ',
            status: 'Pending'
        }
    ];
    return (
        <div className={styles.container}>
            <div className={styles.welcomeBanner}>
                <h1>Welcome back, Admin! </h1>
                <p>Here's what's happening with your store today.</p>
            </div>

            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.blue}`}>
                    <div className={styles.content}>
                        <h3>1,250</h3>
                        <p>Total Users</p>
                    </div>
                    <div className={styles.iconBox}>👥</div>
                </div>

                <div className={`${styles.statCard} ${styles.yellow}`}>
                    <div className={styles.content}>
                        <h3>450</h3>
                        <p>Total Orders</p>
                    </div>
                    <div className={styles.iconBox}>📦</div>
                </div>

                <div className={`${styles.statCard} ${styles.green}`}>
                    <div className={styles.content}>
                        <h3>54.2M</h3>
                        <p>Total Revenue</p>
                    </div>
                    <div className={styles.iconBox}>💰</div>
                </div>

                <div className={`${styles.statCard} ${styles.red}`}>
                    <div className={styles.content}>
                        <h3>12</h3>
                        <p>Cancelled</p>
                    </div>
                    <div className={styles.iconBox}>❌</div>
                </div>
            </div>

            <div className={styles.chartsSection}>
                <div className={styles.panel}>
                    <h3>Revenue Analytics (Last 7 Months)</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient
                                        id='colorRevenue'
                                        x1='0'
                                        y1='0'
                                        x2='0'
                                        y2='1'
                                    >
                                        <stop
                                            offset='5%'
                                            stopColor='#3498db'
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset='95%'
                                            stopColor='#3498db'
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray='3 3'
                                    vertical={false}
                                />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type='monotone'
                                    dataKey='revenue'
                                    stroke='#3498db'
                                    fillOpacity={1}
                                    fill='url(#colorRevenue)'
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.panel}>
                    <h3>Recent Transactions</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.id}</td>
                                    <td>{order.user}</td>
                                    <td>
                                        <span
                                            className={`${styles.status} ${
                                                styles[
                                                    order.status.toLowerCase()
                                                ]
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 'bold' }}>
                                        {order.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;
