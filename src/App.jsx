import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import "./App.css";

function App() {
  const [navigateAnim, setNavigateAnim] = useState(false);

  const toggleNavigateAnim = (ms) => {
    setNavigateAnim((prevState) => {
      const newState = !prevState;
      setTimeout(
        () => {
          setNavigateAnim(prevState);
        },
        ms ? ms : 300
      );
      return newState;
    });
  };

  return (
    <>
      <BrowserRouter>
        <AppRoutes toggleNavigateAnim={toggleNavigateAnim} />
      </BrowserRouter>
      <div
        className={`navigate-wrapper ${
          navigateAnim ? "navigate-wrapper-anim" : ""
        }`}
      ></div>
    </>
  );
}

export default App;
