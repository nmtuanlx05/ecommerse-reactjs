import useScrollHandling from '@/hooks/useScrollHandling';
import { useEffect, useState } from 'react';

const useTranslateXImage = () => {
    const { scrollDirection, scrollPosition } = useScrollHandling();
    const [translateXPosition, setTransateXPosition] = useState(80);

    const handleTranslateX = () => {
        if (scrollDirection === 'down' && scrollPosition >= 1600) {
            setTransateXPosition(
                translateXPosition <= 0 ? 0 : translateXPosition - 1
            );
        } else if (scrollDirection === 'up') {
            setTransateXPosition(
                translateXPosition >= 80 ? 80 : translateXPosition + 1
            );
        }
    };

    useEffect(() => {
        handleTranslateX();
    }, [scrollPosition]);

    return {
        translateXPosition
    };
};
export default useTranslateXImage;
