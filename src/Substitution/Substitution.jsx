import React, { useEffect, useState } from 'react';
import Calendar from './components/Calender';
import './substitution.css';

function Substitution() {
  const [selectedDays, setSelectedDays] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    if (Object.keys(selectedDays).length > 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [selectedDays]);

  const handleSelectedDays = (day, monthName, week) => {
    setSelectedDays((prevState) => ({
      ...prevState,
      [week]: {
        ...prevState[week],
        [monthName]: Array.from(new Set([...(prevState[week]?.[monthName] || []), day])),
      },
    }));
  };

  const handleRemoveDay = (day, monthName, week) => {
    setSelectedDays((prevState) => ({
      ...prevState,
      [week]: {
        ...prevState[week],
        [monthName]: prevState[week]?.[monthName]
          ? prevState[week][monthName].filter((d) => d !== day) 
          : [],
      },
    }));
  };

  const handleRemoveMonth = (monthName, week) => {
    setSelectedDays((prevState) => {
      const updatedWeek = {...prevState[week]}

      delete updatedWeek[monthName];

      return {
        ...prevState,
        [week] : updatedWeek
      }
    })
  }

  const handleRemoveWeek = (week) => {
   setSelectedDays((prevState) => {
    const updateDays = {...prevState};
    delete updateDays[week];
    return updateDays;
   })
  }

  const whatWeek = (day) => weeks[day];

  const renderSelectedDays = () => {
    const weekKeys = Object.keys(selectedDays);

    return weekKeys.map((weekKey) => {
      const months = selectedDays[weekKey];
      const monthKeys = Object.keys(months);

      return (
        <div
          key={weekKey}
          className={`sd-container ${isEmpty ? 'animate' : ''}`} 
          style={{
            transition: 'all 200ms ease-in-out',
          }}
        >
          <h2 onClick={() => {
            handleRemoveWeek(weekKey);
          }}>{whatWeek(weekKey)}</h2>
          <div className="week-container">
            {monthKeys.map((monthKey, index) => {
              const days = months[monthKey];
              return (
                <div key={index} className="month-container">
                  <h3>{monthKey}</h3>
                  {days.map((day, dayIndex) => (
                    <p key={dayIndex} className="day-container" onClick={() => {
                      handleRemoveDay(day, monthKey, weekKey)
                    }}>
                      {day}
                    </p>
                  ))}
                  <h3 className="delete" onClick={() => {
                    handleRemoveMonth(monthKey, weekKey)
                  }
                  }>X</h3>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    
    <div className='main-wrapper'>
      <div className="substituion-wrapper">
        <div className={`cd-wrapper ${isEmpty ? 'shift' : ''} intro`}>
          <Calendar onSendData={handleSelectedDays} ></Calendar>
        </div> 
        <div className={`sd-wrapper ${isEmpty ? 'shift' : ''}`}>
          {renderSelectedDays()}
        </div>
      </div>
    </div>
  );
}

export default Substitution;
