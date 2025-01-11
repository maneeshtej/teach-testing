import React, { useEffect, useRef, useState } from "react";
import "./simplesubstitution.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getTeacherTimetable } from "../utils/fetch";
import CalendarSelector from "./CalendarSelector/CalendarSelector";

function SimpleSubstution({ handleNavigateAnim }) {
  const location = useLocation();
  console.log(location.state.dir);
  const teacherID = location.state.teacherID;
  const dir = location.state.dir;
  const [teacherTimetable, setTeacherTimetable] = useState();
  const SimpestRef = useRef(null);
  const [selectedClasses, setSelectedClasses] = useState({});
  const [clearAll, setClearAll] = useState(false);
  const navigate = useNavigate();
  const [anim, setAnim] = useState();

  useEffect(() => {
    if (dir) {
      setAnim(dir);
    }

    setTimeout(() => {
      console.log("runnin");
      setAnim("");
    }, 300);
  }, [dir]);

  useEffect(() => {
    if (!teacherID) {
      console.error("Teacher not not recieved");
    }
  }, []);

  const updateClasses = (classes) => {
    if (!classes) {
      return;
    }

    setSelectedClasses(classes);
  };

  useEffect(() => {}, [selectedClasses]);

  const handleMouseMove = (e) => {
    const rect = SimpestRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    SimpestRef.current.style.setProperty("--x", `${x}px`);
    SimpestRef.current.style.setProperty("--y", `${y}px`);
  };

  useEffect(() => {
    // console.log(teacherID);

    const getTimetable = async () => {
      if (!teacherID) return;

      const { data, error } = await getTeacherTimetable(teacherID);

      if (error) console.error(error);

      if (data) {
        setTeacherTimetable(data);
        localStorage.setItem("teacherTimetable", JSON.stringify(data));
      }

      //   console.log(data);
    };

    const localTimeTable = JSON.parse(localStorage.getItem("teacherTimetable"));

    if (localTimeTable) {
      setTeacherTimetable(localTimeTable);
    } else {
      getTimetable();
    }
  }, [teacherID]);

  useEffect(() => {
    console.log(selectedClasses);
  }, [selectedClasses]);

  const handleClearAll = () => {
    setClearAll(true);

    setTimeout(() => {
      setClearAll(false);
    }, 50);
  };

  return (
    <div className={`simplest-wrapper ${anim ? anim : ""}`}>
      <div className="simplest-header">
        <span
          onClick={() => {
            localStorage.removeItem("selectedPeriods");
            handleNavigateAnim(
              "/home",
              { state: "transferred" },
              setAnim,
              "toRight"
            );
          }}
        >
          Back
        </span>
      </div>
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
              <div
                className="simplest-header-right-item"
                onClick={() => handleClearAll()}
              >
                Clear All
              </div>
            </div>
          </div>
        </div>
        <div className="simplest-content-body">
          <CalendarSelector
            timeTable={teacherTimetable}
            updateClasses={updateClasses}
            clearall={clearAll}
            teacherId={teacherID}
          />
        </div>
        <div className="simplest-content-footer">
          <button
            className="simplest-content-footer-next"
            onClick={() => {
              // toggleNavigateAnim();
              // setTimeout(() => {
              //   navigate("/confirmSubstitution", {
              //     state: { selectedClasses },
              //   });
              // }, 300);
              handleNavigateAnim(
                "/confirmSubstitution",
                { selectedClasses },
                setAnim,
                "toLeft"
              );
            }}
            style={{
              transform:
                Object.keys(selectedClasses).length === 0
                  ? "translateY(200px)"
                  : "translateY(0px)",
              // visibility:
              //   Object.keys(selectedClasses).length === 0
              //     ? "hidden"
              //     : "visible",
              // opacity: Object.keys(selectedClasses).length === 0 ? 0 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimpleSubstution;
