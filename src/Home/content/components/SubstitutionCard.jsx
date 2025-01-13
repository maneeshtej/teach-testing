import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./substitutioncard.css";

function SubstitutionCard({
  subData,
  index,
  number,
  handleSelectedSubstitutions,
  selectedSubstitutions,
}) {
  const teacherSubstitutions = subData;
  const subcardRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, number * 10);

    return () => clearTimeout(timer);
  }, [number]);

  useEffect(() => {}, [teacherSubstitutions]);

  const handleMouseMove = (e) => {
    const rect = subcardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    subcardRef.current.style.setProperty("--x", `${x}px`);
    subcardRef.current.style.setProperty("--y", `${y}px`);
  };

  if (!index)
    return (
      <>
        <div
          className="subcard-wrapper"
          style={{
            transition: `all 100ms linear ${number * 10}ms`,
            transform: animate ? "translateX(0px)" : "translateX(50px)",
            opacity: animate ? "1" : "0",
          }}
        >
          <div className="subcard-index subcard-wrapper-item">{number}</div>
          <div className="subcard-subname subcard-wrapper-item">
            {teacherSubstitutions.subject_name}
          </div>

          <div className="subcard-date subcard-wrapper-item">
            {teacherSubstitutions.date_of_period}
          </div>
          <div className="subcard-teacher subcard-wrapper-item">
            {teacherSubstitutions.teacher_name}
          </div>
          <div className="subcard-subteacher subcard-wrapper-item">
            {teacherSubstitutions.sub_teacher_name}
          </div>
          <div className="subcard-status subcard-wrapper-item">
            {teacherSubstitutions.status}
          </div>
          <div className="subcard-state subcard-wrapper-item">
            {teacherSubstitutions.state}
          </div>
          <div className="subcard-select">
            <input
              type="checkbox"
              onChange={() =>
                handleSelectedSubstitutions(teacherSubstitutions.sub_id)
              }
              checked={selectedSubstitutions.includes(
                teacherSubstitutions.sub_id
              )}
            ></input>
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <div className="subcard-wrapper-false">
          <div className="subcard-index subcard-wrapper-item">Index</div>
          <div className="subcard-subname subcard-wrapper-item">Subject</div>
          <div className="subcard-date subcard-wrapper-item">Date</div>
          <div className="subcard-teacher subcard-wrapper-item">Teacher</div>
          <div className="subcard-subteacher subcard-wrapper-item">
            Sub Teacher
          </div>
          <div className="subcard-status subcard-wrapper-item">Status</div>
          <div className="subcard-state subcard-wrapper-item">State</div>
          <div className="subcard-select">
            <input type="checkbox"></input>
          </div>
        </div>
      </>
    );
}

export default SubstitutionCard;
