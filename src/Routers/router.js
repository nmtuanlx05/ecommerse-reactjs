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
    }
];
export default routers;
