import { useContext } from 'react';
import styles from './styles.module.scss';
import { SideBarContext } from '@/contexts/SideBarProvider';
import classNames from 'classnames';
import { GrClose } from 'react-icons/gr';
import BoxIcon from '@components/Header/BoxIcon/BoxIcon';
import Login from '@components/ContentSidebar/Login/Login';

function Sidebar() {
    const {boxIcon, container, overlay, sideBar, sliderSideBar } = styles;

    const { isOpen, setIsOpen } = useContext(SideBarContext);

    const handleToggle = () => {
        setIsOpen(!isOpen);
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
                <Login/>
            </div>
        </div>
    );
}

export default Sidebar;
