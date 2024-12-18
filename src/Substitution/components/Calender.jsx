import React, { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import {
  addDate,
  loadDates,
  clearAllDates,
} from "../../utils/substitutionUtils/calender/calenderUtils.js";
import "./calender.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState({}); // State to manage selected days

  useEffect(() => {
    // Load selected days from localStorage on component mount
    const loadedDays = loadDates();
    setSelectedDays(loadedDays);
  }, []);

  const handleDateClick = (date) => {
    const updatedDays = addDate(selectedDays, date);
    setSelectedDays(updatedDays); // Update state with the new selection
  };

  const handleClearAll = () => {
    const clearedDays = clearAllDates();
    setSelectedDays(clearedDays); // Clear state and localStorage
  };

  const renderHeader = () => (
    <div className="header">
      <button onClick={prevMonth}>{"<"}</button>
      <h2>{format(currentMonth, "MMMM yyyy")}</h2>
      <button onClick={nextMonth}>{">"}</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let day of weekDays) {
      days.push(
        <div className="day-name" key={day}>
          {day}
        </div>
      );
    }
    return <div className="days">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;

        const isSelected = Object.keys(selectedDays).some((month) =>
          Object.keys(selectedDays[month]).some((week) =>
            selectedDays[month][week].includes(format(cloneDay, "d"))
          )
        );

        days.push(
          <div
            className={`cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSelected
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span>{format(day, "d")}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="cells">{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div>
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <div className="controls">
        <button onClick={handleClearAll}>Clear All Selected Days</button>
      </div>
      <div className="selected-days">
        <h3>Selected Days</h3>
        <pre>{JSON.stringify(selectedDays, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Calendar;
