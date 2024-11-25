import React, { useState } from 'react';
import './calender.css'

const Calendar = ({onSendData}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const sendData = (day, monthName, week) => {
        onSendData(day, monthName, week);
    }
  
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const getDaysInMonth = () => {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = [];
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const totalDays = lastDayOfMonth.getDate();

        for (let i = 0; i < firstDayOfWeek; i++) {
            daysInMonth.push(null);
        }

        for (let i = 1; i <= totalDays; i++) {
            daysInMonth.push(i);
        }

        return daysInMonth;
    };

    const daysInMonth = getDaysInMonth();

    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    const monthName = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return (
        <div>
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>Previous</button>
                <h2>{monthName} {year}</h2>
                <button onClick={handleNextMonth}>Next</button>
            </div>
            <div className="calendar">
                <div className="days-of-week">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <div key={index}  className="day-name">{day}</div>
                    ))}
                </div>
                <div className="days-grid">
                    {daysInMonth.map((day, index) => (
                        <div key={index} className="day"
                        onClick={() => {sendData(day, monthName, parseInt(index) % 7)}}>
                            {day ? day : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
