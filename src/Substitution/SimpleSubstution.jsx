import React, { useEffect, useRef, useState } from "react";
import "./simplesubstitution.css";
import { useLocation } from "react-router-dom";
import { getTeacherTimetable } from "../utils/fetch";
import CalendarSelector from "./CalendarSelector/CalendarSelector";

function SimpleSubstution({ toggleNavigateAnim }) {
  const location = useLocation();
  const teacherID = location.state.teacherID;
  const [teacherTimetable, setTeacherTimetable] = useState();
  const SimpestRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = SimpestRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    SimpestRef.current.style.setProperty("--x", `${x}px`);
    SimpestRef.current.style.setProperty("--y", `${y}px`);
  };

  setTimeout(() => {
    toggleNavigateAnim(false);
  }, 0);

  useEffect(() => {
    // console.log(teacherID);
    const getTimetable = async () => {
      if (!teacherID) return;

      const { data, error } = await getTeacherTimetable(teacherID);

      if (error) console.error(error);

      if (data) setTeacherTimetable(data);

      //   console.log(data);
    };

    getTimetable();
  }, [teacherID]);

  return (
    <div className="simplest-wrapper">
      <div className="simplest-header"></div>
      <div
        className="simplest-content"
        ref={SimpestRef}
        onMouseMove={handleMouseMove}
      >
        <div className="simplest-content-header">
          <div className="simplest-content-header-left"></div>
          <div className="simplest-content-header-right">
            <div className="simplest-header-right-items">
              <div className="simplest-header-right-item">Help</div>
              <div className="simplest-header-right-item">Draft</div>
              <div className="simplest-header-right-item">Clear All</div>
            </div>
          </div>
        </div>
        <div className="simplest-content-body">
          <CalendarSelector timeTable={teacherTimetable} />
        </div>
      </div>
    </div>
  );
}

export default SimpleSubstution;
