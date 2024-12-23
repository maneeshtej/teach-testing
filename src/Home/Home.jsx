import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Substitution from "../Substitution/Substitution.jsx";
import {
  checkSession,
  getUser,
  getTimeTable,
  convertTimeTable,
  handleLogOut,
  getPage,
  setPage,
} from "../utils/homeUtils/homeUtils.js";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [teacherData, setTeacherData] = useState([]);
  const [unpreparedTimeTable, setUnpreparedTimeTable] = useState();
  const [timeTable, setTimeTable] = useState([]);
  const useremail = Cookies.get("email");
  const [curPage, setCurPage] = useState(getPage() || 0);

  useEffect(() => {
    // Get user info and update state
    const fetchUserData = async () => {
      const userData = await getUser(useremail);
      if (userData.error) {
        console.error(userData.error);
        setIsLoading(false);
        return;
      }
      setUser(userData.user);
      setTeacherData(userData.teacherData);

      fetchTimeTable();
    };

    // Get timetable info and update state
    const fetchTimeTable = async () => {
      const timeTableData = await getTimeTable();
      if (timeTableData.error) {
        console.error(timeTableData.error);
        setIsLoading(false);
        return;
      }
      setUnpreparedTimeTable(timeTableData);
      const formattedTimeTable = convertTimeTable(timeTableData);
      setTimeTable(formattedTimeTable);
    };

    fetchUserData();

    const interval = setInterval(() => {
      checkSession(navigate);
    }, 5000);

    return () => clearInterval(interval);
  }, [useremail, navigate]);

  const switchPage = (page) => {
    setCurPage(setPage(page));
    // console.log(getPage());
  };

  // Header component to display user profile and menu items
  const Header = () => (
    <div className="header">
      <div className="profile">
        <div className="profile-image">{/* Profile Image */}</div>
        <div className="profile-name">{user}</div>
      </div>
      <div className="menu-items">
        <div className="menu-item to-do">
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M29 16a13 13 0 11-26 0 13 13 0 0126 0h0z"
            />
            <path
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.5 16l3.5 3.5 6-6"
            />
          </svg>
        </div>
        <div className="menu-item notification">
          <svg
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="white"
              d="m13.58 11.6-1.33-2.18V6.33A4.36 4.36 0 0 0 10 2.26a2.45 2.45 0 0 0 0-.38A1.94 1.94 0 0 0 8 0a1.94 1.94 0 0 0-2 1.88 1.64 1.64 0 0 0 0 .38 4.36 4.36 0 0 0-2.25 4.07v3.09L2.42 11.6a1.25 1.25 0 0 0 1.06 1.9h1.77A2.68 2.68 0 0 0 8 16a2.68 2.68 0 0 0 2.75-2.5h1.77a1.25 1.25 0 0 0 1.06-1.9zM7.25 1.88A.7.7 0 0 1 8 1.25a.7.7 0 0 1 .75.63 6 6 0 0 0-.75 0 5.9 5.9 0 0 0-.75 0zM8 14.75a1.44 1.44 0 0 1-1.5-1.25h3A1.44 1.44 0 0 1 8 14.75zm-4.52-2.5 1.34-2.17.18-.31V6.33a4 4 0 0 1 .6-2.12A2.68 2.68 0 0 1 8 3.12a2.68 2.68 0 0 1 2.4 1.09 4 4 0 0 1 .6 2.12v3.44l.18.31 1.34 2.17z"
            />
          </svg>
        </div>
        <div className="menu-item calender">
          <svg
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="white"
              d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"
            />
          </svg>
        </div>
        <div
          className="menu-item logout"
          onClick={() => handleLogOut(navigate)}
        >
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3V12M18.3611 5.64001C19.6195 6.8988 20.4764 8.50246 20.8234 10.2482C21.1704 11.994 20.992 13.8034 20.3107 15.4478C19.6295 17.0921 18.4759 18.4976 16.9959 19.4864C15.5159 20.4752 13.776 21.0029 11.9961 21.0029C10.2162 21.0029 8.47625 20.4752 6.99627 19.4864C5.51629 18.4976 4.36274 17.0921 3.68146 15.4478C3.00019 13.8034 2.82179 11.994 3.16882 10.2482C3.51584 8.50246 4.37272 6.8988 5.6311 5.64001"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  const Pageselector = () => (
    <div className="pheader">
      <h1
        className="pheader-item"
        onClick={() => {
          switchPage(0);
        }}
        style={{
          color: curPage == 0 ? "red" : "white",
        }}
      >
        DASHBOARD
      </h1>
      <h1
        className="pheader-item"
        onClick={() => {
          switchPage(1);
        }}
        style={{
          color: curPage == 1 ? "red" : "white",
        }}
      >
        SUBSTITUION
      </h1>
      <h1
        className="pheader-item"
        onClick={() => {
          switchPage(2);
        }}
        style={{
          color: curPage == 2 ? "red" : "white",
        }}
      >
        PREFERENCES
      </h1>
    </div>
  );

  const DisplayPage = () => {
    switch (curPage) {
      case 0:
        return <h1>Hello</h1>;
        break;
      case 1:
        return <Substitution></Substitution>;
        break;
      case 2:
        return <h1>Info</h1>;
    }
  };

  // Returning JSX for the Home page component
  return (
    <div>
      <Header />
      <section className="main">
        <Pageselector />
        <DisplayPage />
      </section>
    </div>
  );
}

export default Home;
