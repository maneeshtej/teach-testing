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

  useEffect(() => {
    console.log(selectedPeriods);
  }, [selectedPeriods]);

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

  const RenerDropdown = ({ index }) => {
    if (teachers) {
      return (
        <div className="sub3-dropdown">
          <input
            type="text"
            className="sub3-dropdown-searchbar"
            onFocus={() => getSearchFocus(index)}
            value={handleInputChange(index) || "none"}
            onChange={() => {}} // Keep empty for dropdown-controlled input
          />
          <div
            className="sub3-dropdown-options"
            style={{
              display: index === dropdownIndex ? "flex" : "none",
            }}
          >
            {Object.keys(teachers).map((teacher) => (
              <div
                key={teacher} // Ensure a unique key for each dropdown option
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
        <RenerDropdown />
        <div className="cell-item">
          <input type="checkbox" />
        </div>
        <div className="cell-item">
          <input type="checkbox" />
        </div>
        <div className="cell-item">
          <input type="checkbox" />
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
            <input type="checkbox" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Substitution3;
