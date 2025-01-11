import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ConfirmSubstitution() {
  const location = useLocation();
  const selectedClasses = location.state.selectedClasses;

  useEffect(() => {
    console.log(selectedClasses);
  }, [selectedClasses]);
  return <div>ConfirmSubstitution</div>;
}

export default ConfirmSubstitution;
