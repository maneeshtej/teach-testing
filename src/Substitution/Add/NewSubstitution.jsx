import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newsubstitution.css";
import { convertTimeTable, getTeachers } from "./newsubstitution";

function NewSubstitution() {
  const navigate = useNavigate();
  const [dates, setDates] = useState(
    JSON.parse(localStorage.getItem("dates")) || {}
  );
  const weekTimeTable =
    JSON.parse(localStorage.getItem("weekTimeTable")) ||
    convertTimeTable() ||
    {};
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [teachers, setTeachers] = useState(
    JSON.parse(localStorage.getItem("Teachers")) || convertTimeTable()
  );

  useEffect(() => {
    console.log("Updated dates:", dates);
    // console.log(weekTimeTable);
    localStorage.setItem("dates", JSON.stringify(dates));
    console.log(teachers);
  }, [dates, teachers]);

  const addNewDate = (date) => {
    if (!date) return;

    const TodayDate = new Date(date);
    const TodayWeek = days[TodayDate.getDay()];

    setDates((prevDates) => ({
      ...prevDates,
      [date]: prevDates[date] || { edit: false, subjects: [], day: TodayWeek },
    }));
  };

  const updateDate = (prevDate, newDate) => {
    if (!prevDate || !newDate || prevDate === newDate) return;

    const newDay = days[new Date(newDate).getDay()];

    setDates((prevDates) => {
      const { [prevDate]: dateData, ...rest } = prevDates;

      const updatedDateData = {
        ...dateData,
        day: newDay,
        subjects: [],
      };

      return {
        ...rest,
        [newDate]: updatedDateData,
      };
    });
  };

  const deleteDate = (date) => {
    setDates((prevDates) => {
      const { [date]: _, ...rest } = prevDates;
      return rest;
    });
  };

  const addPeriod = (date, period) => {
    if (!date || !period) {
      return;
    }

    if (!dates[date]) {
      return;
    }

    setDates((prevState) => {
      const newDates = { ...prevState };
      const newSubArray = [...newDates[date].subjects];

      let finalArray;

      const found = newSubArray.find((value) => value === period);
      if (found) {
        finalArray = newSubArray.filter((value) => value !== period);
      } else {
        // Add the period if it doesn't exist and ensure uniqueness
        const updatedSubArray = [...newDates[date].subjects, period];
        finalArray = updatedSubArray.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      }

      newDates[date] = {
        ...newDates[date],
        subjects: finalArray,
      };

      return newDates;
    });
  };

  return (
    <div className="newsub-wrapper">
      <h1
        onClick={() => {
          navigate("/home");
          localStorage.removeItem("dates");
        }}
      >
        {"< "}
      </h1>
      <h1
        onClick={() => {
          navigate("/home");
          localStorage.removeItem("dates");
        }}
      >
        {" > "}
      </h1>
      <button
        className="newsub-adddate"
        onClick={() => {
          const today = new Date().toISOString().split("T")[0];
          addNewDate(today);
        }}
      >
        Add Today's Date
      </button>
      {Object.keys(dates).map((date, index) => (
        <div className="newsub-datecell" key={index}>
          <h3>{date}</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => updateDate(date, e.target.value)}
          />
          {weekTimeTable?.[dates[date]?.day]?.map((period, periodIndex) => (
            <button
              key={periodIndex}
              onClick={() => {
                addPeriod(
                  date,
                  typeof period === "string"
                    ? period
                    : `${period[1]}${period[0]}`
                );
              }}
            >
              {typeof period === "string" ? period : period?.[0]}
            </button>
          ))}
          <button onClick={() => deleteDate(date)}>Delete</button>
        </div>
      ))}

      <div className="newsub-datecell">
        <h3>Add New Date</h3>
        <input
          type="date"
          onChange={(e) => {
            addNewDate(e.target.value);
            e.target.value = "";
          }}
        />
      </div>
      {Object.keys(dates).map((date) => (
        <div className="newsub-datecell">
          <h3>{date}</h3>
          {dates[date].subjects.map((subject, index) => (
            <h3>{subject}</h3>
          ))}
        </div>
      ))}
    </div>
  );
}

export default NewSubstitution;
