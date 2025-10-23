import { GoStarFill } from 'react-icons/go';
import styles from '../styles.module.scss';
function FormItem({ label, isRequired, typeChildren }) {
    const { formItem, boxItemStars } = styles;

    const renderStars = (length) => {
        return Array.from({ length }, (_, index) => (
            <GoStarFill key={index} color='#e1e1e1' />
        ));
    };

    const renderChildren = () => {
        switch (typeChildren) {
            case 'rating':
                return (
                    <div className={boxItemStars}>
                        <div>{renderStars(1)}</div>
                        <div>{renderStars(2)}</div>
                        <div>{renderStars(3)}</div>
                        <div>{renderStars(4)}</div>
                        <div>{renderStars(5)}</div>
                    </div>
                );
            case 'input':
                return <input type='text' />;
            case 'textarea':
                return <textarea rows={10} />;
        }
    };

    return (
        <div className={formItem}>
            <label>
                {label} {isRequired && <span>*</span>}
            </label>
            {renderChildren()}
        </div>
    );
}

export default FormItem;
