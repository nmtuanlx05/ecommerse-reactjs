import styles from './styles.module.scss';

function InputCustom({
    label,
    type,
    dataOptions,
    isRequired = false,
    register,
    isShowLabel = true,
    placeholder = label,
    isError = false,
    ...props
}) {
    const { container, labelCLS, error } = styles;

    const renderInput = () => {
        //  Nếu type là 'select' thì mới render Select Box
        if (type === 'select') {
            return (
                <select
                    className={isError ? error : ''}
                    {...register}
                    {...props}
                >
                    <option value='' disabled hidden>
                        {label}
                    </option>
                    {dataOptions?.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            );
        }

        //  Các trường hợp còn lại (text, email, password, number...) thì render Input
        return (
            <input
                className={isError ? error : ''}
                type={type} //  Dùng biến type truyền vào thay vì hardcode 'text'
                placeholder={placeholder}
                {...register}
                {...props}
            />
        );
    };
    return (
        <div className={container}>
            {isShowLabel && (
                <label className={labelCLS}>
                    {label} {isRequired && <span>*</span>}
                </label>
            )}
            {renderInput()}
        </div>
    );
}

export default InputCustom;
