import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/login.jsx";
import Home from "./Home/home/Home.jsx";
import SignUp from "./Login/signup";
import SimpleSubstution from "./Substitution/SimpleSubstution.jsx";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);
  const [navigateAnim, setNavigateAnim] = useState(false);

  const toggleNavigateAnim = (state) => {
    setNavigateAnim(state);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home toggleNavigateAnim={toggleNavigateAnim} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/simplest"
            element={
              <ProtectedRoute>
                <SimpleSubstution toggleNavigateAnim={toggleNavigateAnim} />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
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
