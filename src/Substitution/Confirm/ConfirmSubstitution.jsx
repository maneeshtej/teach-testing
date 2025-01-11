import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ConfirmSubstitution() {
  const location = useLocation();
  const selectedClasses = location.state.selectedClasses;
  const dir = location.state.dir;
  const [anim, setAnim] = useState();

  useState(() => {
    if (dir) {
      setAnim(dir);
    }
  });

  useEffect(() => {
    console.log(selectedClasses);
  }, [selectedClasses]);
  return (
    <div
      className={anim ? anim : ""}
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      ConfirmSubstitution
    </div>
  );
}

export default ConfirmSubstitution;
