import { StepperProvider } from '@/contexts/SteperProvider';
import ContentStep from '@/pages/Cart/components/ContentStep';
import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/MainLayout/MainLayout';
import Steps from '@pages/Cart/components/steps/Steps';
import styles from './styles.module.scss';
function Cart() {
    const { container } = styles;

    return (
        <StepperProvider>
            <MyHeader />

            <div className={container}>
                <Steps />
                <MainLayout>
                    <ContentStep />
                </MainLayout>
            </div>

            <MyFooter />
        </StepperProvider>
    );
}

export default Cart;
