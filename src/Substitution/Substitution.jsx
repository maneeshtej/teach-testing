import React, { useEffect, useState } from 'react'
import Calendar from './components/Calender'
import './substitution.css'

function Substitution() {

    const [selectedDays, setSelectedDays] = useState({});

    useEffect(() => {
      // console.log(selectedDays);
      // renderSelectedDays();
  }, [selectedDays]);

  const handleSelectedDays = (day, monthName, week) => {
    setSelectedDays((prevState) => ({
        ...prevState,
        [week]: {
            ...prevState[week],
            [monthName]: Array.from(
                new Set([...(prevState[week]?.[monthName] || []), day])
            ), 
        },
    }));
};


    const renderSelectedDays = () => {
      const weekKeys = Object.keys(selectedDays); 
    
      return weekKeys.map((weekKey) => {
        const months = selectedDays[weekKey]; 
        const monthKeys = Object.keys(months); 
    
        return (
          <div key={weekKey} className='sd-container'>
            <h2>Week: {weekKey}</h2>
            <div className='week-container'>
              {monthKeys.map((monthKey, index) => {
                const days = months[monthKey]; 
                return (
                  
                  <div key={index} className='month-container'>
                    <h3>{monthKey}</h3>
                    {days.map((day, dayIndex) => (
                      <p key={dayIndex} className='day-container'>{day}</p> 
                    ))}
                    <h3 className='delete'>X</h3>
                  </div>
                  
                );
              })}
            </div>
          </div>
        );
      });
    };
    


  
  return (
    <div className='substituion-wrapper'>
      {renderSelectedDays()}
        <Calendar onSendData = {handleSelectedDays}></Calendar>
    </div>
  )
}

export default Substitution