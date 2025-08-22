import { useEffect, useState, useRef } from 'react';

const useTranslateImage = () => {
    const [scrollDirection, setScrollDirection] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [translateXPosition, setTransateXPosition] = useState(80);
    const previousScrollPosition = useRef(0);

    const scrollTracking = () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > previousScrollPosition.current) {
            setScrollDirection('down');
        } else if (currentScrollPosition < previousScrollPosition.current) {
            setScrollDirection('up');
        }
        previousScrollPosition.current =
            currentScrollPosition <= 0 ? 0 : currentScrollPosition;
        setScrollPosition(currentScrollPosition);
    };

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
        window.addEventListener('scroll', scrollTracking);

        return () => window.removeEventListener('scroll', scrollTracking);
    }, []);

    useEffect(() => {
        handleTranslateX();
    }, [scrollPosition]);

    return {
        translateXPosition
    };
};

export default useTranslateImage;
