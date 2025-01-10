
import { supabase } from "../utils/supabase.js";
import Cookies from "js-cookie";

export const checkSession = (navigate) => {
  const authToken = Cookies.get("auth_token");
  const email = Cookies.get("email");

  if (!authToken || !email) {
    alert("Session expired. Please log in again");
    handleLogOut(navigate);
    navigate("/");
  }
};

export const handleLogOut = (navigate) => {
  Cookies.remove("auth_token");
  Cookies.remove("email");
  localStorage.removeItem("username");
  localStorage.removeItem("TeacherData");
  localStorage.removeItem("TeacherTimeTable");
  localStorage.removeItem("selectedPeriods");
  localStorage.removeItem("localSelectedDays");
  localStorage.removeItem("page");
  localStorage.removeItem("subpage");
  navigate("/");
};


  