import BoxIcon from './BoxIcon/BoxIcon';
import { dataBoxIcon, dataMenu } from './constants';
import Menu from './Menu/Menu';
import styles from './styles.module.scss';
import logo from '@icons/images/Logo-retina.webp';
import reloadIcon from '@icons/svgs/reloadIcon.svg'
import heart from '@icons/svgs/heartIcon.svg'
import cart from '@icons/svgs/cartIcon.svg';

function MyHeader() {
    const { containerBoxIcon, containerMenu, containerHeader, containerBox } =
        styles;
    return (
        <div className={containerHeader}>
            <div className={containerMenu}>
                <div className={containerBox}>
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
                        <Menu content={item.content} href={item.href} />
                    ))}
                </div>
                <div className={containerBox}>
                    <img width={26} height={26} src={reloadIcon} alt='' />
                    <img width={26} height={26} src={heart} alt='' />
                    <img width={26} height={26} src={cart} alt='' />
                </div>
            </div>
        </div>
    );
}

export default MyHeader;
