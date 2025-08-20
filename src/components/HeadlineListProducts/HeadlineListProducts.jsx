import CountdownTimer from '@components/CountdownTimer/CountdownTimer';
import MainLayout from '@components/MainLayout/MainLayout';
import styles from './styles.module.scss';
import CountdownBanner from '@components/CountdownBanner/CountdownBanner';
function HeadlineListProducts() {
    const targetDate = '2025-12-31T00:00:00';
    const { container , containerItem } = styles;
    return (
        <MainLayout>
            {/* <CountdownTimer targetDate={targetDate} /> */}
            <div className={container}>
                <CountdownBanner/>
                <div className={containerItem}>
                    <div>1</div>
                    <div>2</div>
                </div>
            </div>
        </MainLayout>
    );
}

export default HeadlineListProducts;
