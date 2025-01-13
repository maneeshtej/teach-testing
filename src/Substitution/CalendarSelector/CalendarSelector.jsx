import React, { useEffect, useState } from "react";
import "./calendarselector.css";
import { convertTimetable } from "../../utils/convert";

function CalendarSelector({ timeTable, updateClasses, clearall, teacherId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const teacherTimetable = timeTable;
  const [convertedTimetable, setConvertedTimetable] = useState();
  const localSelectedPeriods = JSON.parse(
    localStorage.getItem("selectedPeriods")
  );
  const [selectedPeriods, setSelectedPeriods] = useState(
    localSelectedPeriods ? localSelectedPeriods : {}
  );

  const [mobileSelectedDate, setMobileSelectedDate] = useState();

  useEffect(() => {
    if (!clearall) {
      return;
    } else if (clearall) {
      setSelectedPeriods({});
    }
  }, [clearall]);

  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDates = (startDate) => {
    const dates = [];
    const baseDate = new Date(startDate);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);

      dates.push({
        day: currentDate.getDate(),
        month: months[currentDate.getMonth()],
        week: weeks[currentDate.getDay()],
        monthn: currentDate.getMonth(),
        weekn: currentDate.getDay(),
        yearn: currentDate.getFullYear(),
      });
    }

    return dates;
  };

  const moveDate = (direction, number) => {
    const moveNumber = direction === "next" ? number : -number;
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + moveNumber);

    setCurrentDate(newDate);
    const dates = getDates(newDate);
    setWeekDates(dates);
  };

  useEffect(() => {
    const initialDates = getDates(currentDate);
    setWeekDates(initialDates);
  }, [currentDate]);

  useEffect(() => {
    const convertedTable = convertTimetable(teacherTimetable);
    if (convertedTable) {
      setConvertedTimetable(convertedTable);
    }
  }, [teacherTimetable]);

  useEffect(() => {}, [convertedTimetable]);

  const formatDate = (date) => {
    return `${date.yearn}-${date.monthn + 1}-${date.day}`;
  };

  const getFormattedKey = (date, period) => {
    if (!date || !period) {
      return;
    }
    const formattedDate = formatDate(date);
    const formattedKey = `${period.class_id}_${formattedDate}`;

    return formattedKey;
  };

  const handlePeriodClick = (date, period) => {
    if (!date || !period) {
      return;
    }

    const formattedKey = getFormattedKey(date, period);

    setSelectedPeriods((prevState) => {
      if (!date || !period) {
        return prevState;
      }

      const newSelectedPeriods = { ...prevState };
      const newPeriod = {
        ...date,
        ...period,
        date: formatDate(date),
        sub_teacher: null,
        sub_teacher_id: null,
      };

      if (!newSelectedPeriods[formattedKey]) {
        newSelectedPeriods[formattedKey] = newPeriod;

        localStorage.setItem(
          "selectedPeriods",
          JSON.stringify(newSelectedPeriods)
        );

        return newSelectedPeriods;
      }

      if (newSelectedPeriods[formattedKey]) {
        const { [formattedKey]: _, ...rest } = newSelectedPeriods;
        return rest;
      }

      return newSelectedPeriods;
    });
  };

  const isSelected = (date, period) => {
    if (!date || !period) {
      return;
    }

    if (!selectedPeriods) {
      return;
    }

    const formattedKey = getFormattedKey(date, period);

    if (!formattedKey) return;

    if (selectedPeriods[formattedKey]) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    updateClasses(selectedPeriods);
  }, [selectedPeriods]);
  return (
    <div className="cs-wrapper">
      <div className="cs-header">
        <div className="cs-header-left"></div>
        <div className="cs-header-right">
          <div className="cs-header-right-items">
            <div
              className="cs-header-right-item"
              onClick={() => moveDate("prev", 7)}
            >
              Previous
            </div>
            <div
              className="cs-header-right-item"
              onClick={() => moveDate("next", 7)}
            >
              Next
            </div>
          </div>
        </div>
      </div>
      <div className="cs-content">
        <div className="cs-content-selector">
          <div className="cs-content-selector-dates">
            {weekDates.map((date, index) => (
              <div
                key={index}
                className="cs-content-selector-date"
                onClick={() => {
                  setMobileSelectedDate(date.weekn);
                }}
              >
                <div className="cs-selector-date-item day">
                  <strong>{date.day}</strong>
                </div>
                <div className="cs-selector-date-item month">
                  {date.month.slice(0, 3)}
                </div>
                <div className="cs-selector-date-item week">
                  {date.week.slice(0, 3)}
                </div>
              </div>
            ))}
          </div>
          <div className="cs-content-selector-periods">
            {weekDates.map((date, index) => (
              <div className="cs-content-selector-period" key={index}>
                {/* Check if there are periods for the given day */}
                {convertedTimetable[date.weekn] &&
                typeof convertedTimetable[date.weekn] === "object" ? (
                  Object.keys(convertedTimetable[date.weekn]).map(
                    (item, idx) => (
                      <div
                        className={`cs-selector-period-item ${
                          isSelected(
                            date,
                            convertedTimetable[date.weekn][item]
                              ? convertedTimetable[date.weekn][item]
                              : null
                          )
                            ? "cs-selector-period-item-anim"
                            : ""
                        }`}
                        key={idx}
                        onClick={() => {
                          handlePeriodClick(
                            date,
                            convertedTimetable[date.weekn][item]
                          );
                        }}
                        style={{
                          backgroundColor: isSelected(
                            date,
                            convertedTimetable[date.weekn][item]
                          )
                            ? "rgb(0, 205, 137)"
                            : "",
                          color: isSelected(
                            date,
                            convertedTimetable[date.weekn][item]
                          )
                            ? "black"
                            : "",
                        }}
                      >
                        {convertedTimetable[date.weekn][item].subject_name}
                      </div>
                    )
                  )
                ) : (
                  <div
                    className="cs-selector-period-item"
                    style={{
                      flex: 1,
                    }}
                  >
                    No periods available
                  </div>
                )}
              </div>
            ))}
            <div className="cs-content-selector-period-mobile">
              {mobileSelectedDate && convertedTimetable[mobileSelectedDate] ? (
                Array.isArray(
                  Object.keys(convertedTimetable[mobileSelectedDate])
                ) &&
                Object.keys(convertedTimetable[mobileSelectedDate]).length >
                  0 ? (
                  Object.keys(convertedTimetable[mobileSelectedDate]).map(
                    (item, idx) => {
                      const periodData =
                        convertedTimetable[mobileSelectedDate][item] || null;
                      // const isPeriodSelected = isSelected(date, periodData);
                      console.log(weekDates);
                      const selectedDate = weekDates.find(
                        (date) => mobileSelectedDate == date.weekn
                      );

                      if (selectedDate) {
                        console.log("Selected Date:", selectedDate);
                      } else {
                        console.log("No matching date found.");
                      }

                      const isPeriodSelected = isSelected(
                        selectedDate,
                        periodData
                      );

                      return (
                        <div
                          className={`cs-selector-period-item ${
                            isPeriodSelected
                              ? "cs-selector-period-item-anim"
                              : ""
                          }`}
                          key={idx}
                          onClick={() =>
                            handlePeriodClick(selectedDate, periodData)
                          }
                          style={{
                            backgroundColor: isPeriodSelected
                              ? "rgb(0, 205, 137)"
                              : "",
                            color: isPeriodSelected ? "black" : "",
                          }}
                        >
                          {periodData?.subject_name || "No subject"}
                        </div>
                      );
                    }
                  )
                ) : (
                  <div
                    className="cs-selector-period-item"
                    style={{
                      flex: 1,
                    }}
                  >
                    No periods available
                  </div>
                )
              ) : (
                <div
                  className="cs-selector-period-item"
                  style={{
                    flex: 1,
                  }}
                >
                  Please select a valid date.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarSelector;
