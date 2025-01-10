import React, { useEffect, useRef } from "react";
import "./substitutioncard.css";

function SubstitutionCard({ subData, index, number }) {
  const teacherSubstitutions = subData;
  const subcardRef = useRef(null);

  useEffect(() => {
    console.log(teacherSubstitutions);
  }, [teacherSubstitutions]);

  const handleMouseMove = (e) => {
    const rect = subcardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    subcardRef.current.style.setProperty("--x", `${x}px`);
    subcardRef.current.style.setProperty("--y", `${y}px`);
  };

  if (!index)
    return (
      <div className="subcard-wrapper">
        <div className="subcard-index subcard-wrapper-item">{number + 1}</div>
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
        <div className="subcard-subteacher subcard-wrapper-item">
          {teacherSubstitutions.status}
        </div>
        <div className="subcard-subteacher subcard-wrapper-item">
          {teacherSubstitutions.state}
        </div>
        <div className="subcard-select">
          <input type="checkbox"></input>
        </div>
      </div>
    );
  else
    return (
      <div className="subcard-wrapper-false">
        <div className="subcard-index subcard-wrapper-item">Index</div>
        <div className="subcard-subname subcard-wrapper-item">Subject</div>
        <div className="subcard-date subcard-wrapper-item">Date</div>
        <div className="subcard-teacher subcard-wrapper-item">Teacher</div>
        <div className="subcard-subteacher subcard-wrapper-item">
          Sub Teacher
        </div>
        <div className="subcard-subteacher subcard-wrapper-item">Status</div>
        <div className="subcard-subteacher subcard-wrapper-item">State</div>
        <div className="subcard-select">
          <input type="checkbox"></input>
        </div>
      </div>
    );
}

export default SubstitutionCard;
