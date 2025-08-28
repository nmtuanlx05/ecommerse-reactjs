import BoxIcon from './BoxIcon/BoxIcon';
import { dataBoxIcon, dataMenu } from './constants';
import Menu from './Menu/Menu';
import styles from './styles.module.scss';
import logo from '@images/Logo-retina.webp';
import reloadIcon from '@icons/svgs/reloadIcon.svg';
import heart from '@icons/svgs/heartIcon.svg';
import cart from '@icons/svgs/cartIcon.svg';
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
        topHeader
    } = styles;

    const { scrollPosition } = useScrollHandling();

    const [fixedPosition, setFixedPosition] = useState(false);

    useEffect(() => {
        // if (scrollPosition > 90) {
        //     setFixedPosition(true)
        // }else{
        //     setFixedPosition(false)
        // }

        setFixedPosition(scrollPosition > 90 ? true : false);
    }, [scrollPosition]);

    const { isOpen, setIsOpen } = useContext(SideBarContext);
    console.log(isOpen);
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
                        <img width={26} height={26} src={reloadIcon} alt='' />
                        <img width={26} height={26} src={heart} alt='' />
                        <img width={26} height={26} src={cart} alt='' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHeader;
