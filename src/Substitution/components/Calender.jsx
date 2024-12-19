import React, { useEffect, useState } from "react";
import "./calender.css";

function Calender() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState({});

  useEffect(() => {
    console.log(selectedDays); // Debugging state changes
  }, [selectedDays]);

  const getLocalSelectedDays = () => {
    const localSelectedDays = localStorage.getItem("localSelectedDays");
    if (!localSelectedDays) {
      setSelectedDays({});
    } else {
      setSelectedDays(JSON.parse(localSelectedDays));
    }
  };

  useEffect(() => {
    getLocalSelectedDays();
  }, []);

  const getMonthYear = () => {
    const month = currentMonth.toLocaleString("default", { month: "long" });
    const year = currentMonth.getFullYear();
    return { month, year };
  };

  const getMonthStartEnd = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { firstDay, lastDay };
  };

  const generateCalenderDays = () => {
    const { firstDay, lastDay } = getMonthStartEnd();
    const daysInMonth = lastDay.getDate();
    const startDayofWeek = firstDay.getDay();
    const totalCells = Math.ceil((startDayofWeek + daysInMonth) / 7) * 7;

    const calenderDays = [];
    let dayCounter = 1;

    for (let i = 0; i < totalCells; i++) {
      if (i >= startDayofWeek && dayCounter <= daysInMonth) {
        calenderDays.push(dayCounter);
        dayCounter++;
      } else {
        calenderDays.push(null); // Empty cells
      }
    }

    return calenderDays;
  };

  const prevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  };

  const removeDay = (day, month, weekName) => {
    setSelectedDays((prev) => {
      const updated = { ...prev };

      if (updated[month] && updated[month][weekName]) {
        // Remove the day from the week
        updated[month][weekName] = updated[month][weekName].filter(
          (d) => d !== day
        );

        // Clean up empty week array
        if (updated[month][weekName].length === 0) {
          delete updated[month][weekName];
        }
      }

      // Clean up empty month object
      if (Object.keys(updated[month] || {}).length === 0) {
        delete updated[month];
      }

      // Save updated selected days in localStorage
      localStorage.setItem("localSelectedDays", JSON.stringify(updated));

      return updated;
    });
  };

  const selectDate = (day) => {
    const { month } = getMonthYear();
    const weekName = getWeekName(day);

    console.log(day, month, weekName);

    setSelectedDays((prev) => {
      const updated = { ...prev };

      // Ensure the structure for the month and week exists
      if (!updated[month]) updated[month] = {};
      if (!updated[month][weekName]) updated[month][weekName] = [];

      if (updated[month][weekName].includes(day)) {
        console.log("already exists");
      }

      // Add the day if it's not already in the array
      if (!updated[month][weekName].includes(day)) {
        updated[month][weekName].push(day);
        localStorage.setItem("localSelectedDays", JSON.stringify(updated));
        return updated;
      }

      return updated;
    });
  };

  const getWeekName = (day) => {
    const { firstDay } = getMonthStartEnd();
    const selectedDate = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      day
    );
    return selectedDate.toLocaleString("default", { weekday: "long" });
  };

  const isSelected = (day) => {
    const { month } = getMonthYear();
    const weekName = getWeekName(day);
    return selectedDays[month]?.[weekName]?.includes(day);
  };

  return (
    <div className="cal-calender">
      <div className="cal-header">
        <button onClick={prevMonth}>{"<"}</button>
        <h2>
          {getMonthYear().month} {getMonthYear().year}
        </h2>
        <button onClick={nextMonth}>{">"}</button>
      </div>
      <div className="cal-days">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="cells">
        {generateCalenderDays().map((day, index) => (
          <div
            key={index}
            className={`cell ${day ? "" : "disabled"} ${
              day && isSelected(day) ? "selected" : ""
            }`}
            onClick={() => day && selectDate(day)}
          >
            {day}
          </div>
        ))}
      </div>
      <h2>Selected days:</h2>
      {/* <pre>{JSON.stringify(selectedDays, null, 2)}</pre> */}
      <div className="dayss">
        {Object.keys(selectedDays).map((month) => (
          <div key={month} className="month">
            <h2> {month}</h2>
            {Object.keys(selectedDays[month]).map((week) => (
              <div key={week} className="week">
                <h3>{week}</h3>
                {selectedDays[month][week].map((day) => (
                  <p
                    key={day}
                    className="day"
                    onClick={() => {
                      removeDay(day, month, week);
                    }}
                  >
                    {day}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calender;
