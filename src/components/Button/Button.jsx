import styles from './styles.module.scss';
import classNames from 'classnames';
function Button({ content, isPrinary = true }) {
    const { btn, primaryBtn, secondaryBtn } = styles;
    return (
        <button
            className={classNames(btn, {
                [primaryBtn]: isPrinary,
                [secondaryBtn]: !isPrinary
            })}
        >
            {content}
        </button>
    );
}

export default Button;
