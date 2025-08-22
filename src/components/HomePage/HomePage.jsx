import Banner from '@components/Banner/Banner';
import MyHeader from '@components/Header/Header';
import styles from './styles.module.scss';
import Info from '@components/Info/Info';
import AdvanceHeadline from '@components/AdvanceHeadline/AdvnceHeadline';
import HeadlineListProducts from '@components/HeadlineListProducts/HeadlineListProducts';
import PopularProduct from '@components/PopularProduct/PopularProduct';
import { useEffect, useState } from 'react';
import { getProduct } from '@/apis/productsService';
import SaleHomePage from '@components/SaleHomePage/SaleHomePage';
import MyFooter from '@components/Footer/Footer';
function HomePage() {
    const [listProducts, setListProducts] = useState([]);
    useEffect(() => {
        getProduct().then((res) => {
            setListProducts(res.contents);
        });
    }, []);
    const { container } = styles;
    return (
        <div>
            <div className={container}>
                <MyHeader />
                <Banner />
                <Info />
                <AdvanceHeadline />
                <HeadlineListProducts data={listProducts.slice(1, 3)} />
                <PopularProduct datas={listProducts.slice(3, 15)} />
                <SaleHomePage />
                <MyFooter/>
            </div>
        </div>
    );
}

export default HomePage;
