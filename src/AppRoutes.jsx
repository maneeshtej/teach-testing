import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./Login/login.jsx";
import Home from "./Home/home/Home.jsx";
import SignUp from "./Login/signup";
import SimpleSubstution from "./Substitution/SimpleSubstution.jsx";
import ConfirmSubstitution from "./Substitution/Confirm/ConfirmSubstitution.jsx";

function AppRoutes({ toggleNavigateAnim }) {
  const navigate = useNavigate();

  const handleNavigateAnim = (route, state, setAnim, dir) => {
    if (setAnim) {
      setAnim(
        dir === "toLeft"
          ? "main-anim-to-left"
          : dir === "toRight"
          ? "main-anim-to-right"
          : dir === "fromLeft"
          ? "main-anim-from-left"
          : dir === "fromRight"
          ? "main-anim-from-right"
          : ""
      );
    }
    toggleNavigateAnim(200);

    const newState = {
      ...state,
      dir:
        dir === "toLeft"
          ? "main-anim-from-right"
          : dir === "toRight"
          ? "main-anim-from-left"
          : dir === "fromLeft"
          ? "main-anim-to-right"
          : dir === "fromRight"
          ? "main-anim-to-left"
          : "",
    };

    // console.log(newState);
    setTimeout(() => {
      navigate(route, { state: newState });
    }, 200);
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home handleNavigateAnim={handleNavigateAnim} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/simplest"
        element={
          <ProtectedRoute>
            <SimpleSubstution handleNavigateAnim={handleNavigateAnim} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirmSubstitution"
        element={
          <ProtectedRoute>
            <ConfirmSubstitution />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
