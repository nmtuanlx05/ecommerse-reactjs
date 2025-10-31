import { StepperContext } from '@/contexts/SteperProvider';
import styles from '../../styles.module.scss';
import cls from 'classnames';
import { useContext } from 'react';
function Stepper({ number, content, isDisabled }) {
    const { numberStep, textStep, stepper, isDisableStep, isDisableText } =
        styles;

    const { currentStep, setCurrentStep } = useContext(StepperContext);

    return (
        <div
            className={stepper}
            onClick={() => {
                setCurrentStep(number);
            }}
        >
            <div
                className={cls(numberStep, {
                    [isDisableStep]: isDisabled
                })}
            >
                {number}
            </div>
            <div
                className={cls(textStep, {
                    [isDisableText]: isDisabled
                })}
            >
                {content}
            </div>
        </div>
    );
}

export default Stepper;
