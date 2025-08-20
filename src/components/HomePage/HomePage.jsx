import Banner from '@components/Banner/Banner';
import MyHeader from '@components/Header/Header';
import styles from './styles.module.scss';
import Info from '@components/Info/Info';
import AdvanceHeadline from '@components/AdvanceHeadline/AdvnceHeadline';
import HeadlineListProducts from '@components/HeadlineListProducts/HeadlineListProducts';
function HomePage() {
    const { container } = styles;
    return (
        <div>
            <div className={container}>
                <MyHeader />
                <Banner />
                <Info />
                <AdvanceHeadline />
                <HeadlineListProducts />
                <div style={{height : '200px'}}></div>
            </div>
        </div>
    );
}

export default HomePage;
