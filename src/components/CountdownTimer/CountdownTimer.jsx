import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
function CountdownTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const {box , title} = styles;
    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Mins: Math.floor((difference / 1000 / 60) % 60),
                Seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const formatNumber = (number) => {
        return String(number).padStart(2, '0');
    };

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (timeLeft[interval] != undefined) {
            timerComponents.push(
                <span key={interval} className={box}>
                    {formatNumber(timeLeft[interval])}{' '}
                    <span className={title}>{interval}</span>{' '}
                </span>
            );
        }
    });
    return timerComponents;
}

export default CountdownTimer;
