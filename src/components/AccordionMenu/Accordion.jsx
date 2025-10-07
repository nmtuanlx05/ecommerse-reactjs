import { useState } from 'react';
import styles from './styles.module.scss';
import cls from 'classnames';
import { TfiLayoutLineSolid } from 'react-icons/tfi';
import { BsChevronDown } from 'react-icons/bs';

function AccordionMenu({ titleMenu, contentJsx, onClick, isSelected }) {
    const {
        container,
        title,
        activeTitle,
        contentMenu,
        isVisibility,
        borderBottom
    } = styles;

    const handleToggle = () => {
        onClick();
    };
    return (
        <div className={container}>
            <div
                className={cls(title, {
                    [activeTitle]: isSelected
                })}
                onClick={handleToggle}
            >
                {isSelected ? (
                    <TfiLayoutLineSolid size={16} />
                ) : (
                    <BsChevronDown size={16} />
                )}
                {titleMenu}
            </div>

            <div
                className={cls(contentMenu, borderBottom, {
                    [isVisibility]: isSelected
                })}
            >
                {contentJsx}
            </div>
        </div>
    );
}

export default AccordionMenu;
