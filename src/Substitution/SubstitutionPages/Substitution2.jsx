import React, { useEffect, useState } from "react";
import "./substitution2.css";

function Substitution2() {
  const [selectedDays, setSelectedDays] = useState(() => {
    const localSelectedDays = localStorage.getItem("localSelectedDays");
    return localSelectedDays ? JSON.parse(localSelectedDays) : {};
  });
  const [teacherTimeTable, setTeacherTimeTable] = useState(() => {
    const localTimeTable = localStorage.getItem("TeacherTimeTable");
    if (!localTimeTable) {
      alert("TimeTable not set");
      return {};
    } else {
      return JSON.parse(localTimeTable);
    }
  });
  const [convertedTimeTable, setConvertedTimeTable] = useState({});
  const [selectedPeriods, setSelectedPeriods] = useState(() => {
    const localSelectedPeriods = localStorage.getItem("selectedPeriods");

    if (localSelectedPeriods) {
      return JSON.parse(localSelectedPeriods);
    } else {
      return {};
    }
  });

  useEffect(() => {
    // console.log(selectedDays);
    // console.log(teacherTimeTable);
    console.log(selectedPeriods);
  }, [selectedDays, teacherTimeTable, selectedPeriods]);

  const convertTimeTable = () => {
    const weekNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Initialize the result object
    const convertedTimeTable = {};

    for (let keys in teacherTimeTable) {
      const classData = teacherTimeTable[keys];

      // Get the day of the week (1-7), which corresponds to [Monday-Sunday]
      const dayIndex = classData.day_of_week - 1; // Adjust for 0-based index (e.g., 1 = Monday)
      const weekDayName = weekNames[dayIndex];

      // If the day does not exist in the result object, initialize it
      if (!convertedTimeTable[weekDayName]) {
        convertedTimeTable[weekDayName] = [];
      }

      // Push the class data for the specific day of the week
      convertedTimeTable[weekDayName].push({
        class_id: keys,
        teacher_id: classData.teacher_id,
        subject_name: classData.subject_name,
        start_time: classData.start_time,
        end_time: classData.end_time,
        duration: classData.duration,
        special_period: classData.special_period,
      });
    }

    // // Update state or log the result
    // console.log(convertedTimeTable);
    setConvertedTimeTable(convertedTimeTable); // Assuming you want to save it in state
  };

  useEffect(() => {
    convertTimeTable();
    // console.log(convertedTimeTable);
  }, []);

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

  const selectPeriods = (period, day, month) => {
    setSelectedPeriods((prevState) => {
      const updated = { ...prevState };

      // Use day in the composite key instead of week or start_time
      const compositeKey = `${period.class_id}_${day}`;

      // Add or update the period data
      updated[compositeKey] = {
        class_id: period.class_id,
        subject_name: period.subject_name,
        teacher_id: period.teacher_id,
        date: new Date(
          `${month} ${day}, ${new Date().getFullYear()} ${period.start_time}`
        ).toISOString(), // ISO format
      };

      // Save updated state to localStorage
      localStorage.setItem("selectedPeriods", JSON.stringify(updated));
      return updated;
    });
  };

  const removePeriods = (class_id) => {
    setSelectedPeriods((prevState) => {
      const updated = { ...prevState };
      delete updated[class_id];
      localStorage.setItem("selectedPeriods", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="days">
      {Object.keys(selectedDays).map((month) => (
        <div key={month} className="month">
          <h2> {month}</h2>
          {Object.keys(selectedDays[month]).map((week) => (
            <div key={week} className="week">
              <h3>{week}</h3>
              {selectedDays[month][week].map((day) => (
                <p key={day} className="day">
                  <div
                    className="day-date"
                    onClick={() => {
                      removeDay(day, month, week);
                    }}
                  >
                    {day}
                  </div>
                  {Object.keys(convertedTimeTable).map((weeks) => {
                    if (weeks === week) {
                      return (
                        <div key={week} className="period">
                          {convertedTimeTable[week].map((classData) => (
                            <div
                              key={classData.class_id}
                              onClick={() => {
                                selectPeriods(classData, day, month, week);
                                console.log(classData);
                              }}
                              style={{}}
                            >
                              {classData.subject_name}
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null; // If it's not the week you're interested in, return null
                  })}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="selected-periods">
        {Object.keys(selectedPeriods).map((period) => (
          <div
            onClick={() => {
              removePeriods(period);
            }}
          >
            {period} {selectedPeriods[period].subject_name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Substitution2;
