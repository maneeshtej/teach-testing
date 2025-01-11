import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./confirmsubstitution.css";

function ConfirmSubstitution({ handleNavigateAnim }) {
  const location = useLocation();
  const selectedClasses = location.state.selectedClasses;
  const dir = location.state.dir;
  const [anim, setAnim] = useState();
  const [highlightedPeriod, setHighlightedPeriod] = useState({});
  console.log(selectedClasses);

  useState(() => {
    if (dir) {
      setAnim(dir);
    }
  });

  useEffect(() => {
    // console.log(selectedClasses);
  }, [selectedClasses]);

  useEffect(() => {
    console.log(highlightedPeriod);
  }, [highlightedPeriod]);

  return (
    <div className={anim ? anim : ""}>
      <div className="cst-wrapper">
        <div
          className="cst-header"
          onClick={() => {
            localStorage.removeItem("selectedPeriods");
            handleNavigateAnim("/simplest", null, setAnim, "toRight");
          }}
        >
          Back
        </div>
        <div className="cst-body">
          <div className="cst-sidebar">
            {Object.keys(highlightedPeriod).map((item, index) => {
              return (
                <div
                  className="cst-sidebar-info"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    alignItems: "center",
                    marginTop: "20px",
                    marginLeft: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "100%",
                      color: "rgb(170, 170, 170)",
                      fontSize: "13px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "start",
                      gap: "10px",
                    }}
                  >
                    <span>{item}</span>
                    <span>:</span> <span>{highlightedPeriod[item]}</span>
                    <br></br>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="cst-content">
            <div className="cst-content-header"></div>
            <div className="cst-content-items">
              {selectedClasses && Object.keys(selectedClasses).length > 0 ? (
                Object.keys(selectedClasses).map((item) => {
                  const curClass = selectedClasses[item];
                  return (
                    <div
                      className="cst-content-item"
                      key={item}
                      onClick={() => setHighlightedPeriod(curClass)}
                    >
                      <div className="cst-content-item-element">
                        {curClass.subject_name || "No Subject"}
                      </div>
                      <div className="cst-content-item-element">
                        {curClass.date || "No Date"}
                      </div>
                      <div className="cst-content-item-element">
                        <input placeholder="Input 1" />
                      </div>
                      <div className="cst-content-item-element">
                        <input placeholder="Input 2" />
                      </div>
                      <div className="cst-content-item-element">
                        <input type="checkbox" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1>No substitutions</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmSubstitution;
