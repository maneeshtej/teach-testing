import React, { useState, useEffect } from "react";
import Calender from "./components/Calender";
import Substitution2 from "./SubstitutionPages/Substitution2";
import "./substitution.css";
import Substitution3 from "./SubstitutionPages/Substitution3";

function Substitution() {
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("subpage");
    return storedPage ? parseInt(storedPage) : 0;
  });

  useEffect(() => {
    // console.log(page);
  }, [page]);

  const pageSetter = (page) => {
    localStorage.setItem("subpage", page);
    setPage(page);
  };

  return (
    <div className="sub-wrapper">
      <div className="sub-header">
        <h1
          className="sub-header-item"
          onClick={() => pageSetter(0)}
          style={{
            color: page === 0 ? "red" : "",
          }}
        >
          1
        </h1>
        <h1
          className="sub-header-item"
          onClick={() => pageSetter(1)}
          style={{
            color: page === 1 ? "red" : "",
          }}
        >
          2
        </h1>
        <h1
          className="sub-header-item"
          onClick={() => pageSetter(2)}
          style={{
            color: page === 2 ? "red" : "",
          }}
        >
          3
        </h1>
      </div>
      {page === 0 ? (
        <Calender />
      ) : page === 1 ? (
        <Substitution2 />
      ) : (
        <Substitution3 />
      )}
    </div>
  );
}

export default Substitution;
