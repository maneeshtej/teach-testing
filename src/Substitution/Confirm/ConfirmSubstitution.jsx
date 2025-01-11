import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchAllTeachers } from "../../utils/fetch";
import "./confirmsubstitution.css";
import SendSubstitution from "../Send/sendSubstitution";

function ConfirmSubstitution({ handleNavigateAnim }) {
  const location = useLocation();
  const [selectedClasses, setSelectedClasses] = useState();
  const tempSelectedClasses = location.state.selectedClasses;
  const dir = location?.state?.dir ?? "";
  const teacherID = location.state.teacherID;
  const [anim, setAnim] = useState();
  const [highlightedPeriod, setHighlightedPeriod] = useState({});
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [teachers, setTeachers] = useState();
  const [send, setSend] = useState(false);
  const ConfirmRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ConfirmRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ConfirmRef.current.style.setProperty("--x", `${x}px`);
    ConfirmRef.current.style.setProperty("--y", `${y}px`);
  };

  useEffect(() => {
    if (dir) {
      setAnim(dir);
    }

    setTimeout(() => {
      setAnim("");
    }, 300);
  }, []);

  // console.log(teacherID);

  useEffect(() => {
    if (tempSelectedClasses) {
      setSelectedClasses(tempSelectedClasses);
    }
  }, [tempSelectedClasses]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, error } = await fetchAllTeachers();

      if (error) {
        console.error(error);
      }

      if (data) {
        // console.log(data);

        if (teacherID) {
          Object.keys(data).forEach((item) => {
            if (teacherID === data[item].id) {
              delete data[item];
            }
          });
        }

        // console.log(data);
        setTeachers(data);
      }
    };

    fetchTeachers();
  }, [selectedClasses]);

  useEffect(() => {
    console.log(selectedClasses);
  }, [selectedClasses]);

  useEffect(() => {
    // console.log(highlightedPeriod);
  }, [highlightedPeriod]);

  useEffect(() => {
    // console.log(teachers);
  }, [teachers]);

  const handleInputChange = (e, item) => {
    const [id, name] = e.target.value.split("_");
    // console.log(id, name, item);

    if (!item || !id || !name) {
      console.error("No input");
      return;
    }
    setSelectedClasses((prevState) => {
      const tempClasses = { ...prevState };

      if (!tempClasses) {
        return;
      }

      if (tempClasses[item]) {
        tempClasses[item].sub_teacher = name;
        tempClasses[item].sub_teacher_id = id;
      }

      return tempClasses;
    });
  };

  const handleSelectedIndex = (item) => {
    if (!item || !selectedClasses) {
      console.error("no input");
      return;
    }

    if (item === "index") {
      if (selectedIndexes.includes(item)) {
        setSelectedIndexes([]);
        return;
      }

      setSelectedIndexes(Object.keys(selectedClasses));

      setSelectedIndexes((prevState) => {
        return [...prevState, item];
      });
      return;
    }

    if (!selectedClasses[item]) {
      return;
    }

    setSelectedIndexes((prevState) => {
      const tempArray = [...prevState];

      if (!tempArray) {
        return prevState;
      }

      const itemIndex = tempArray.indexOf(item);
      if (itemIndex !== -1) {
        tempArray.splice(itemIndex, 1);
      } else {
        tempArray.push(item);
      }

      return tempArray;
    });
  };

  const handleSend = (value) => {
    setSend(value);
  };

  return (
    <div className={`${anim ? anim : ""}`}>
      <div className="cst-wrapper">
        <div
          className="cst-header"
          onClick={() => {
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
                  key={index}
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
          <div
            className="cst-content"
            ref={ConfirmRef}
            onMouseMove={handleMouseMove}
          >
            <div className="cst-content-header"></div>
            <div className="cst-content-items">
              <div
                className="cst-content-item"
                style={{
                  backgroundColor: "rgb(20, 20, 20)",
                  height: "5vh",
                  borderBottom: "1px solid rgb(50, 50, 50)",
                }}
              >
                <div className="cst-content-item-element">{"Subject"}</div>
                <div className="cst-content-item-element">{"Date"}</div>
                <div className="cst-content-item-element">
                  <select
                    name="teachers"
                    style={{
                      width: "100px",
                    }}
                    onChange={(e) => {
                      selectedIndexes.forEach((item) => {
                        // console.log(item);
                        if (item !== "index") {
                          // console.log(e.target.value);
                          handleInputChange(e, item);
                        }
                      });
                    }}
                  >
                    {/* <option value={"selected"}></option> */}

                    <option>none</option>
                    {teachers && Object.keys(teachers).length > 0 ? (
                      Object.keys(teachers).map((teacherKey, index) => {
                        const curTeacher = teachers[teacherKey];
                        // console.log(curTeacher.id, teacherID);
                        if (String(curTeacher.id) === String(teacherID)) {
                          // console.log(`Skipping teacher with ID: ${teacherID}`);
                          return null;
                        }

                        return (
                          <option
                            key={index}
                            value={`${curTeacher.id}_${curTeacher.name}`}
                          >
                            {curTeacher.name}
                          </option>
                        );
                      })
                    ) : (
                      <option>No teachers available</option>
                    )}
                  </select>
                </div>
                <div className="cst-content-item-element">
                  <input placeholder="Input 2" />
                </div>
                <div className="cst-content-item-element">
                  <input
                    type="checkbox"
                    value={selectedIndexes.includes("index")}
                    onChange={() => {
                      handleSelectedIndex("index");
                    }}
                  />
                </div>
              </div>
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
                        <select
                          name="teachers"
                          style={{
                            width: "100px",
                          }}
                          onChange={(e) => handleInputChange(e, item)}
                        >
                          <option>
                            {/* {console.log(selectedClasses[item].sub_teacher)} */}
                            {selectedClasses[item].sub_teacher}
                          </option>
                          <option>none</option>
                          {teachers && Object.keys(teachers).length > 0 ? (
                            Object.keys(teachers).map((teacherKey, index) => {
                              const curTeacher = teachers[teacherKey];
                              return (
                                <option
                                  key={index}
                                >{`${curTeacher.id}_${curTeacher.name}`}</option>
                              );
                            })
                          ) : (
                            <option>No teachers available</option>
                          )}
                        </select>
                      </div>
                      <div className="cst-content-item-element">
                        <input placeholder="Input 2" />
                      </div>
                      <div className="cst-content-item-element">
                        <input
                          type="checkbox"
                          checked={selectedIndexes.includes(item)}
                          onChange={() => {
                            handleSelectedIndex(item);
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <div className="cst-navbar">
              <span
                onClick={() => {
                  setSend(true);
                }}
              >
                Submit
              </span>
            </div>
          </div>
        </div>
      </div>
      {send ? (
        <SendSubstitution
          selectedClasses={selectedClasses}
          setSend={handleSend}
          handleNavigateAnim={handleNavigateAnim}
          setAnim={setAnim}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ConfirmSubstitution;
