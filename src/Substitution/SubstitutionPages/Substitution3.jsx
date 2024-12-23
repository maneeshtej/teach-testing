import React, { useEffect, useState } from "react";
import "./substitution3.css";
import { supabase } from "../../utils/supabase.js";

function Substitution3() {
  const [selectedPeriods, setSelectedPeriods] = useState(() => {
    const localSelectedPeriods = localStorage.getItem("selectedPeriods");
    if (localSelectedPeriods) {
      return JSON.parse(localSelectedPeriods);
    } else {
      return {};
    }
  });
  const [teachers, setTeachers] = useState();
  const [dropdownIndex, setDropdownIndex] = useState();
  const [selectedSubTeachers, setSelectedSubTeachers] = useState({});
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  useEffect(() => {
    // console.log(selectedSubTeachers);
  }, [setSelectedSubTeachers]);

  const getTeachers = async () => {
    const { data, error } = await supabase.from("Teachers").select("*");

    if (data) {
      // console.log(data);
      setTeachers(data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const getSearchFocus = (index) => {
    if (dropdownIndex == index) {
      setDropdownIndex(null);
      return;
    }
    setDropdownIndex(index);
  };

  const handleInputChange = (index) => {
    if (!index) return "";
    return selectedSubTeachers[index] || "";
  };

  const updateTeacher = (value, id, index) => {
    // console.log(selectedPeriods[index]);
    if (!value || !index) return;

    setSelectedSubTeachers((prevState) => ({
      ...prevState,
      [index]: value,
    }));

    setSelectedPeriods((prevState) => {
      const updated = { ...prevState };

      if (!updated[index].sub_teach_id) {
        updated[index].sub_teach_id = "";
      }

      updated[index].sub_teach_id = id;

      return updated;
    });

    setDropdownIndex(null);
  };

  const selectIndex = (id) => {
    setSelectedIndexes((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((item) => item != id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const checkSelected = (id) => {
    if (selectedIndexes.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  const selectAll = () => {
    if (selectedIndexes.includes(-1)) {
      setSelectedIndexes([]);
    } else {
      selectIndex(-1);
      for (let id in selectedPeriods) {
        setSelectedIndexes((prevState) => {
          if (prevState.includes(id)) {
            return prevState;
          } else {
            return [...prevState, id];
          }
        });
      }
    }
  };

  const selectSelectedIndexesTeachers = (value, teachId) => {
    selectedIndexes.forEach((id) => {
      // Skip the special -1 index for "select all"
      if (id !== -1 && selectedPeriods[id]) {
        updateTeacher(value, teachId, id);
      }
    });
  };

  const SelectAllDropDown = () => {
    if (teachers) {
      return (
        <div className="sub3-dropdown">
          <input
            type="text"
            className="sub3-dropdown-searchbar"
            onFocus={() => getSearchFocus(-1)}
            value={() => handleInputChange(-1)}
            onChange={() => {}}
          />
          <div
            className="sub3-dropdown-options"
            style={{
              display: -1 === dropdownIndex ? "flex" : "none",
            }}
          >
            {teachers.map((teacher) => (
              <div
                className="sub3-dropdown-option"
                key={teacher.id}
                onClick={() => {
                  getSearchFocus(-1);
                  selectSelectedIndexesTeachers(teacher.name, teacher.id);
                }}
              >
                {teacher.name}
              </div>
            ))}
            <div
              className="sub3-dropdown-option"
              onClick={() => {
                getSearchFocus(-1);
                selectSelectedIndexesTeachers("none", null);
              }}
            >
              none
            </div>
          </div>
        </div>
      );
    }
  };

  const RenerDropdown = ({ index }) => {
    if (teachers) {
      return (
        <div className="sub3-dropdown">
          <input
            type="text"
            className="sub3-dropdown-searchbar"
            onFocus={() => getSearchFocus(index)}
            value={handleInputChange(index) || "none"}
            onChange={() => {}}
          />
          <div
            className="sub3-dropdown-options"
            style={{
              display: index === dropdownIndex ? "flex" : "none",
            }}
          >
            {Object.keys(teachers).map((teacher) => (
              <div
                key={teacher}
                className="sub3-dropdown-option"
                onClick={() =>
                  updateTeacher(
                    teachers[teacher].name,
                    teachers[teacher].id,
                    index
                  )
                }
              >
                {teachers[teacher].name}
              </div>
            ))}
            <div
              className="sub3-dropdown-option"
              onClick={() => updateTeacher("none", index)}
            >
              none
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="sub3-wrapper">
      <div className="sub3-wrapper-heading">
        {[
          "class ID",
          "Subject",
          "date",
          "Teacher",
          "Return",
          "confirm",
          "Select all",
        ].map((heading) => (
          <div key={heading}>{heading}</div>
        ))}
      </div>
      <div className="sub3-cell">
        <h3>-</h3>
        <h3>-</h3>
        <h3>-</h3>
        <SelectAllDropDown></SelectAllDropDown>
        <div className="cell-item">
          <input type="checkbox" />
        </div>
        <div className="cell-item">
          <input type="checkbox" />
        </div>
        <div className="cell-item">
          <input
            type="checkbox"
            checked={checkSelected(-1)}
            onChange={() => selectAll()}
          />
        </div>
      </div>
      {Object.keys(selectedPeriods).map((id) => (
        <div className="sub3-cell" key={id}>
          <div className="cell-item">{id.slice(0, 3)}</div>
          <div className="cell-item">{selectedPeriods[id].subject_name}</div>
          <div className="cell-item">
            {selectedPeriods[id].date.slice(0, 10)}
          </div>
          <div className="cell-item">
            <RenerDropdown index={id} />
          </div>
          <div className="cell-item">
            <input type="checkbox" />
          </div>
          <div className="cell-item">
            <input type="checkbox" />
          </div>
          <div className="cell-item">
            <input
              type="checkbox"
              checked={checkSelected(id)}
              onChange={() => selectIndex(id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Substitution3;
