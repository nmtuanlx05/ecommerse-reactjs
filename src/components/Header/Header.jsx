import BoxIcon from './BoxIcon/BoxIcon';
import { dataBoxIcon, dataMenu } from './constants';
import Menu from './Menu/Menu';
import styles from './styles.module.scss';
import logo from '@images/Logo-retina.webp';
import { TfiReload } from 'react-icons/tfi';
import { CiHeart } from 'react-icons/ci';
import { PiShoppingCartLight } from 'react-icons/pi';
import useScrollHandling from '@/hooks/useScrollHandling';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { SideBarContext } from '@/contexts/SideBarProvider';

function MyHeader() {
    const {
        containerBoxIcon,
        containerMenu,
        containerHeader,
        containerBox,
        container,
        fixedHeader,
        topHeader,
        boxCart,
        quantity
    } = styles;

    const { scrollPosition } = useScrollHandling();
    const [fixedPosition, setFixedPosition] = useState(false);
    const { isOpen, setIsOpen, type, setType, listProductCart } =
        useContext(SideBarContext);

    const handleOpenSideBar = (type) => {
        setIsOpen(true);
        setType(type);
    };

    useEffect(() => {
        setFixedPosition(scrollPosition > 90 ? true : false);
    }, [scrollPosition]);

    return (
        <div
            className={classNames(container, topHeader, {
                [fixedHeader]: fixedPosition
            })}
        >
            <div className={containerHeader}>
                <div className={containerBox}>
                    <div className={containerBoxIcon}>
                        {dataBoxIcon.map((item) => (
                            <BoxIcon type={item.type} href={item.href} />
                        ))}
                    </div>
                    <div className={containerMenu}>
                        {dataMenu.slice(0, 3).map((item) => (
                            <Menu content={item.content} href={item.href} />
                        ))}
                    </div>
                </div>
                <div>
                    <img
                        src={logo}
                        alt='Logo'
                        style={{
                            width: '153px',
                            height: '53px'
                        }}
                    />
                </div>
                <div className={containerBox}>
                    <div className={containerMenu}>
                        {dataMenu.slice(3, 6).map((item) => (
                            <Menu
                                content={item.content}
                                href={item.href}
                                setIsOpen={setIsOpen}
                            />
                        ))}
                    </div>
                    <div className={containerBoxIcon}>
                        <TfiReload
                            style={{ fontSize: '22px', cursor: 'pointer' }}
                            onClick={() => handleOpenSideBar('compare')}
                        />

                        <CiHeart
                            style={{ fontSize: '28px', cursor: 'pointer' }}
                            onClick={() => handleOpenSideBar('wishlist')}
                        />

                        <div className={boxCart}>
                            <PiShoppingCartLight
                                style={{ fontSize: '25px', cursor: 'pointer' }}
                                onClick={() => handleOpenSideBar('cart')}
                            />
                            <div className={quantity}>
                                {listProductCart.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHeader;
