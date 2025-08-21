import MainLayout from '@components/MainLayout/MainLayout';
import styles from './styles.module.scss';
import ProductItem from '@components/ProductItem/ProducyItem';
function PopularProduct({datas}) {
    const { container } = styles;
    console.log(datas, 'datas')
    return (
        <>
            <MainLayout>
                <div className={container}>
                    {datas.map((item) => (
                        <ProductItem
                            key={item.id}
                            src={item.images[0]}
                            preSvrc={item.images[1]}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
                </div>
            </MainLayout>
        </>
    );
}

export default PopularProduct;
