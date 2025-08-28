import { useState } from 'react';
import styles from './styles.module.scss';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

function InputCommon({ label, type, isRequired = false }) {
    const { labelInput, boxInput, container, boxIcon } = styles;
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password' ? true : false;

    const isShowTextPassword =
        type === 'password' && showPassword ? 'text' : type;

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className={container}>
            <div className={labelInput}>
                {label} {isRequired && <span>*</span>}
            </div>
            <div className={boxInput}>
                <input type={isShowTextPassword} />
                {isPassword && (
                    <div className={boxIcon} onClick={handleShowPassword}>
                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputCommon;
