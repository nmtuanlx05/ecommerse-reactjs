import { useContext } from 'react';
import styles from './styles.module.scss';
import { SideBarContext } from '@/contexts/SideBarProvider';
import classNames from 'classnames';
import { GrClose } from 'react-icons/gr';
import BoxIcon from '@components/Header/BoxIcon/BoxIcon';
import Login from '@components/ContentSidebar/Login/Login';
import Compare from '@components/ContentSidebar/Compare/Compare';
import Wishlist from '@components/ContentSidebar/Wishlist/Wishlist';
import Cart from '@components/ContentSidebar/Cart/Cart';

function Sidebar() {
    const { boxIcon, container, overlay, sideBar, sliderSideBar } = styles;

    const { isOpen, setIsOpen, type } = useContext(SideBarContext);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleRenderContent = () => {
        switch (type) {
            case 'login':
                return <Login />;
            case 'compare':
                return <Compare />;
            case 'wishlist':
                return <Wishlist/>;
            case 'cart':
                return <Cart/>;

            default:
                return <Login />;
        }
    };
    return (
        <div className={container}>
            <div
                className={classNames({
                    [overlay]: isOpen
                })}
                onClick={handleToggle}
            />
            <div
                className={classNames(sideBar, {
                    [sliderSideBar]: isOpen
                })}
            >
                {isOpen && (
                    <div className={boxIcon} onClick={handleToggle}>
                        <GrClose />
                    </div>
                )}
                {handleRenderContent()}
            </div>
        </div>
    );
}

export default Sidebar;
