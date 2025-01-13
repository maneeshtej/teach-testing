import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./Login/login.jsx";
import Home from "./Home/home/Home.jsx";
import SignUp from "./Login/signup";
import SimpleSubstution from "./Substitution/SimpleSubstution.jsx";
import ConfirmSubstitution from "./Substitution/Confirm/ConfirmSubstitution.jsx";
import "./approutes.css";
import { NavigationProvider } from "./utils/Animation/NavigationContext.jsx";

function AppRoutes({ toggleNavigateAnim }) {
  const navigate = useNavigate();
  const [anim, setAnim] = useState("");

  const navigateWithAnim = (route, state, type) => {
    if (!route) {
      return;
    }

    if (!type || type == "entry") {
      setAnim("toleft");
    }

    setTimeout(() => {
      navigate(route, { state: state ?? null });
      const newAnim = type == "entry" ? "fromright" : "fromleft";
      setAnim(newAnim);
    }, 200);
  };

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

    setTimeout(() => {
      navigate(route, { state: newState });
    }, 200);
  };

  return (
    <NavigationProvider value={navigateWithAnim}>
      <div className={`animate-main-wrapper${anim ? `-${anim}` : ""}`}>
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
                <ConfirmSubstitution handleNavigateAnim={handleNavigateAnim} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </NavigationProvider>
  );
}

export default AppRoutes;
