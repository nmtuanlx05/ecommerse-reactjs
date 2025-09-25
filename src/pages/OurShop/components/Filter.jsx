import { TfiLayoutGrid4 } from 'react-icons/tfi';
import { CiCircleList } from 'react-icons/ci';
import styles from '../styles.module.scss';
import cls from 'classnames';
import { useContext } from 'react';
import { OurShopContext } from '@contexts/OurShopProvider';
import SelectBox from '@pages/OurShop/components/SelectBox';

function Filter() {
    const {
        containerFilter,
        boxIcon,
        boxLeft,
        boxRight,
        selectBox,
        show,
        sort
    } = styles;

    const { sortOptions, showOptions, setSortId, setShowId, setIsShowGrid } =
        useContext(OurShopContext);

    const getValueSelect = (value, type) => {
        if (type === 'sort') setSortId(value);
        else setShowId(value);
    };

    const handleShowGrid = (type) => {
        setIsShowGrid(type === 'grid');
    };

    return (
        <div className={containerFilter}>
            <div className={boxLeft}>
                <SelectBox
                    options={sortOptions}
                    getValue={getValueSelect}
                    type='sort'
                />

                <div className={boxIcon}>
                    <TfiLayoutGrid4
                        style={{
                            fontSize: '22px',
                            color: '#404040',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleShowGrid('grid')}
                    />
                    <div
                        style={{
                            height: '20px',
                            width: '1px',
                            backgroundColor: '#e1e1e1'
                        }}
                    />

                    <CiCircleList
                        style={{
                            fontSize: '28px',
                            color: '#404040',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleShowGrid('list')}
                    />
                </div>
            </div>

            <div className={boxLeft}>
                <div style={{ fontSize: '14px', color: '#555' }}>Show</div>
                <SelectBox
                    options={showOptions}
                    getValue={getValueSelect}
                    type='show'
                />
            </div>
        </div>
    );
}

export default Filter;
