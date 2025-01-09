import React from "react";
import "./substitution.css";
import { useNavigate } from "react-router-dom";

function Substitution() {
  const naviagate = useNavigate();
  return (
    <div className="substitution-wrapper">
      <h1
        onClick={() => {
          naviagate("/substitution");
        }}
      >
        Add New
      </h1>
    </div>
  );
}

export default Substitution;
