import React, { useEffect, useState } from 'react';

const ArriveDate = () => {
    const [weekLater, setWeekLater] = useState(null);

    useEffect(() => {
        const currDate = new Date();
        const newDate = new Date(currDate);
        newDate.setDate(newDate.getDate() + 3);
        setWeekLater(newDate);
    }, []);

    const formatDateString = (date) => {
        const week = date.getDay();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        const weekString = (() => {
            switch (week) {
                case 0: return 'Sun';
                case 1: return 'Mon';
                case 2: return 'Tues';
                case 3: return 'Wed';
                case 4: return 'Thur';
                case 5: return 'Fri';
                case 6: return 'Sat';
                default: return 'error';
            }
        })();

        const monthString = (() => {
            switch (month) {
                case 1: return 'Jan';
                case 2: return 'Feb';
                case 3: return 'Mar';
                case 4: return 'Apr';
                case 5: return 'May';
                case 6: return 'Jun';
                case 7: return 'Jul';
                case 8: return 'Aug';
                case 9: return 'Sep';
                case 10: return 'Oct';
                case 11: return 'Nov';
                case 12: return 'Dec';
                default: return 'error';
            }
        })();

        return `${weekString}, ${monthString} ${day}, ${year}`;
    };

    return (
        <>
            {weekLater && <span>{formatDateString(weekLater)}</span>}
        </>
    );
};

export default ArriveDate;
