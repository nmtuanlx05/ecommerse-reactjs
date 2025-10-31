import styles from './styles.module.scss';

function InputCustom({
    label,
    type,
    dataOptions,
    isRequired = false,
    register,
    isShowLabel = true,
    placeholder = label,
    isError = false
}) {
    const { container, labelCLS, error } = styles;

    const renderInput = () => {
        if (type === 'text') {
            return (
                <input
                    className={isError ? error : ''}
                    type='text'
                    placeholder={placeholder}
                    {...register}
                />
            );
        } else {
            return (
                <select {...register} className={isError ? error : ''}>
                    <option value='' selected disabled hidden>
                        {label}
                    </option>
                    {dataOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            );
        }
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
