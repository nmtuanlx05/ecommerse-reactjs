import { useContext } from 'react';
import { StepperContext } from '@/contexts/SteperProvider';
import Contents from '@/pages/Cart/components/contents/Contents';
import Checkout from '@/pages/Cart/components/Checkout/Checkout';

function ContentStep() {
    const { currentStep, setCurrentStep } = useContext(StepperContext);
    const handleRenderContent = () => {
        switch (currentStep) {
            case 1:
                return <Contents />;
            case 2:
                return <Checkout />;
            case 3:
                return <h1>Step 3</h1>;
        }
    };

    return <>{handleRenderContent()}</>;
}

export default ContentStep;
