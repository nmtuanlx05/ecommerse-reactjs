import { useContext, useState } from 'react';
import styles from '../styles.module.scss';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { StoreContext } from '@/contexts/StoreProvider';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function Menu({ content, href }) {
    const { menu, subMenu } = styles;
    const { setIsOpen, setType } = useContext(SideBarContext);
    const { userInfo, handleLogOut } = useContext(StoreContext);
    const [isShowSubMenu, setIsShowSubMenu] = useState(false);
    const naviage = useNavigate();

    const handleClickShowLogin = () => {
        if (content === 'Sign In' && !userInfo) {
            setIsOpen(true);
            setType('login');
        }

        if (content === 'Our Shop') {
            naviage('/shop');
        }
    };

    const handelRenderText = (content) => {
        if (content === 'Sign In' && userInfo) {
            return `Hello: ${userInfo.username}`;
        } else {
            return content;
        }
    };

    const handleHover = () => {
        if (content === 'Sign In' && userInfo) {
            setIsShowSubMenu(true);
        }
    };

    return (
        <div
            className={menu}
            onClick={handleClickShowLogin}
            onMouseEnter={handleHover}
        >
            {handelRenderText(content)}
            {isShowSubMenu && (
                <div
                    onMouseLeave={() => setIsShowSubMenu(false)}
                    className={subMenu}
                    onClick={handleLogOut}
                >
                    LOG OUT
                </div>
            )}
        </div>
    );
}

export default Menu;
