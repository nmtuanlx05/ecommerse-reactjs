import Stepper from '@pages/Cart/components/steps/Stepper';
import styles from '../../styles.module.scss';
function Steps() {
    const { containerSteps, step, line, textNoti } = styles;

    const dataSteps = [
        { number: 1, content: 'Shopping cart' },
        { number: 2, content: 'Checkout' },
        { number: 3, content: 'Order status' }
    ];
    return (
        <div className={containerSteps}>
            <div className={step}>
                {dataSteps.map((item, index) => {
                    return (
                        <>
                            <Stepper
                                key={index}
                                isDisabled={index !== 0}
                                number={item.number}
                                content={item.content}
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
