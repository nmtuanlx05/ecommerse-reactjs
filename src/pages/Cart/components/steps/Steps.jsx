import Stepper from '@pages/Cart/components/steps/Stepper';
import styles from '../../styles.module.scss';
import { useContext } from 'react';
import { StepperContext } from '@/contexts/SteperProvider';
function Steps() {
    const { containerSteps, step, line, textNoti } = styles;

    const dataSteps = [
        { number: 1, content: 'Shopping cart' },
        { number: 2, content: 'Checkout' },
        { number: 3, content: 'Order status' }
    ];
    const { currentStep, setCurrentStep } = useContext(StepperContext);
    return (
        <div className={containerSteps}>
            <div className={step}>
                {dataSteps.map((item, index) => {
                    return (
                        <>
                            <Stepper
                                key={index}
                                isDisabled={index >= currentStep}
                                number={item.number}
                                content={item.content}
                                setCurrentStep={setCurrentStep}
                            />
                            {index != dataSteps.length - 1 && (
                                <div className={line} />
                            )}
                        </>
                    );
                })}
            </div>

            <div className={textNoti}>
                You are out of time! Checkout now to avoid losing your order!
            </div>
        </div>
    );
}

export default Steps;
