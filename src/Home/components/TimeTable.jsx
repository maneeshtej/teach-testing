import React from "react";
import "./timetable.css";

const TimeTable = ({ changedTimeTable, today, todayWeek }) => {
  const starttime = new Date();
  const endtime = new Date();

  const renderTimeTable = () => {
    return Object.keys(changedTimeTable).map((day, index1) => {
      return changedTimeTable[day].map((classItem, index2) => {
        const startday = parseInt(day) + 1;

        const starttimestring = classItem.start_time;
        const starttimeparts = starttimestring.split(":");
        starttime.setHours(
          starttimeparts[0],
          starttimeparts[1],
          starttimeparts[2]
        );

        const endtimestring = classItem.end_time;
        const endtimeparts = endtimestring.split(":");
        endtime.setHours(endtimeparts[0], endtimeparts[1], endtimeparts[2]);

        const isNow =
          today >= starttime &&
          today <= endtime &&
          classItem.day_of_week === todayWeek;

        return (
          <div
            key={`${index1}-${index2}`}
            className="timetable-cell"
            style={{
              gridColumn: `span ${classItem.duration[1]}`,
              gridRowStart: `${startday}`,
              backgroundColor: isNow ? "rgb(75, 255, 75)" : "",
              border: isNow ? "2px solid green" : "",
              color: isNow ? "white" : "",
            }}
          >
            <h3>{classItem.subject_name}</h3>
            {/* <h4>Info</h4> */}
          </div>
        );
      });
    });
  };

  return (
    <div className="timetable-grid">
      <h1 className="timetable-header">Week</h1>
      <h1 style={{ gridRowStart: "2" }} className="timetable-week">
        Monday
      </h1>
      <h1 style={{ gridRowStart: "3" }} className="timetable-week">
        Tuesday
      </h1>
      <h1 style={{ gridRowStart: "4" }} className="timetable-week">
        Wednesday
      </h1>
      <h1 style={{ gridRowStart: "5" }} className="timetable-week">
        Thursday
      </h1>
      <h1 style={{ gridRowStart: "6" }} className="timetable-week">
        Friday
      </h1>
      <h2 className="timetable-header">09:00 - 10:00</h2>
      <h2 className="timetable-header">10:00 - 11:00</h2>
      <h2 className="timetable-header">11:00 - 11:10</h2>
      <h2 className="timetable-header">11:10 - 12:10</h2>
      <h2 className="timetable-header">12:10 - 01:10</h2>
      <h2 className="timetable-header">01:10 - 02:10</h2>
      <h2 className="timetable-header">02:10 - 03:10</h2>
      <h2 className="timetable-header">03:10 - 04:10</h2>

      {renderTimeTable()}

      <h2
        className=""
        style={{
          gridColumnStart: "4",
          gridRowStart: "2",
          gridRowEnd: "7",
          writingMode: "vertical-lr",
          textOrientation: "mixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "gray"
          borderRight: "2px solid black",
          borderLeft: "2px solid black",
          color: "red",
        }}
      >
        Break
      </h2>
      <h2
        className=""
        style={{
          gridColumnStart: "7",
          gridRowStart: "2",
          gridRowEnd: "7",
          writingMode: "vertical-lr",
          textOrientation: "mixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "gray",
          borderRight: "2px solid black",
          borderLeft: "2px solid black",
          color: "red",
        }}
      >
        LunchBreak
      </h2>
    </div>
  );
};

export default TimeTable;
