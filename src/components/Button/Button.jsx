import styles from './styles.module.scss';
import classNames from 'classnames';
function Button({ content, isPrinary = true, className, style, ...props }) {
    const { btn, primaryBtn, secondaryBtn } = styles;
    return (
        <button
            className={classNames(
                btn,
                {
                    [primaryBtn]: isPrinary,
                    [secondaryBtn]: !isPrinary
                },
                className
            )}
            style={style}
            {...props}
        >
            {content}
        </button>
    );
}

export default Button;
