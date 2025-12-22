import { lazy } from 'react';

const routers = [
    {
        path: '/',
        component: lazy(() => import('@components/HomePage/HomePage.jsx'))
    },
    {
        path: '/blog',
        component: lazy(() => import('@components/Blog/Blog'))
    },
    {
        path: '/shop',
        component: lazy(() => import('@pages/OurShop/OurShop.jsx'))
    },
    {
        path: '/cart',
        component: lazy(() => import('@pages/Cart/Cart.jsx'))
    },
    {
        path: '/product/:id',
        component: lazy(() => import('@pages/DetailProduct'))
    },
    {
        path: '/about-us',
        component: lazy(() => import('@pages/AboutUs'))
    },
    {
        path: '/order',
        component: lazy(() => import('@pages/Orders/index.jsx'))
    },
    {
        path: '/checkout',
        component: lazy(() =>
            import('@pages/Cart/components/Checkout/Checkout.jsx')
        )
    },
    {
        path: '/my-orders',
        component: lazy(() => import('@pages/MyOrders/MyOrders.jsx'))
    },
    ,
    {
        path: '/my-orders/:id',
        component: lazy(() => import('@pages/MyOrders/DetailMyOrders.jsx'))
    },
    ,
    {
        path: '/admin',
        component: lazy(() =>
            import('@components/AdminDashboard/AdminDashboard.jsx')
        ),
        children: [
            {
                path: '',
                index: true,
                component: lazy(() =>
                    import('@pages/DashboardHome/DashboardHome.jsx')
                )
            },
            {
                path: 'users',
                component: lazy(() =>
                    import('@pages/AdminUsers/AdminUsers.jsx')
                )
            },
            {
                path: 'products',
                component: lazy(() =>
                    import('@pages/AdminProducts/AdminProducts.jsx')
                )
            },
            {
                path: 'orders',
                component: lazy(() =>
                    import('@pages/AdminOrders/AdminOrder.jsx')
                )
            }
        ]
    }
];
export default routers;
