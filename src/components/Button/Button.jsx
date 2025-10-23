import styles from './styles.module.scss';
import classNames from 'classnames';
function Button({
    content,
    isPrinary = true,
    className,
    style,
    customClassname = false,
    ...props
}) {
    const { btn, primaryBtn, secondaryBtn } = styles;
    return (
        <button
            className={classNames(
                btn,
                {
                    [primaryBtn]: isPrinary,
                    [secondaryBtn]: !isPrinary,
                    [customClassname]: customClassname
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
