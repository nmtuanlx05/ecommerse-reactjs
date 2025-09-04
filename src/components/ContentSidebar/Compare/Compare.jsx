import HeaderSideBar from '@components/ContentSidebar/components/HeaderSideBar/HeaderSideBar';
import { TfiReload } from 'react-icons/tfi';
import styles from './styles.module.scss';
import ItemProduct from '@components/ContentSidebar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
function Compare() {
    const { container, compareBtnWrapper } = styles;
    return (
        <div className={container}>
            <HeaderSideBar icon={<TfiReload size={26} />} title={'COMPARE'} />

            <ItemProduct />

            <div className={compareBtnWrapper}>
                <Button
                    content={'VIEW COMPARE'}
                    className={styles.compareBtn}
                />
            </div>
        </div>
    );
}

export default Compare;
