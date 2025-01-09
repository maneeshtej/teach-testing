import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  checkSession,
  getUser,
  getTimeTable,
  convertTimeTable,
  handleLogOut,
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
  const [filterIndex, setFilterIndex] = useState(0);
  const [filterOptionIndex, setFilterOptionIndex] = useState(-1);

  useEffect(() => {
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

  return (
    <div>
      <section className="home-main">
        <div className="home-sidebar">
          <div className="home-sidebar-header">Teacher Substitution</div>
          <div className="home-sidebar-items">
            <div className="home-sidebar-searchbox">
              <div className="home-sidebar-search">Search...</div>
            </div>
            <div className="home-sidebar-filters">
              <div
                className="home-sidebar-filter"
                onClick={() => setFilterIndex(0)}
                style={{
                  backgroundColor: `${filterIndex == 0 ? "black" : ""}`,
                }}
              >
                All
              </div>
              <div
                className="home-sidebar-filter"
                onClick={() => setFilterIndex(1)}
                style={{
                  backgroundColor: `${filterIndex == 1 ? "black" : ""}`,
                }}
              >
                Sent
              </div>
              <div
                className="home-sidebar-filter"
                onClick={() => setFilterIndex(2)}
                style={{
                  backgroundColor: `${filterIndex == 2 ? "black" : ""}`,
                }}
              >
                Recieved
              </div>
              <div
                className="home-sidebar-filter"
                onClick={() => setFilterIndex(3)}
                style={{
                  backgroundColor: `${filterIndex == 3 ? "black" : ""}`,
                }}
              >
                Draft
              </div>
            </div>
            <div className="home-sidebar-filter-options">
              <div
                className="home-sidebar-filter-option"
                onClick={() => setFilterOptionIndex(0)}
                style={{
                  backgroundColor: `${
                    filterOptionIndex == 0 ? "" : "rgb(30, 30, 30)"
                  }`,
                  width: "13vw",
                }}
              >
                <h3>Time</h3>
                <div
                  className="home-sidebar-filter-suboption"
                  style={{
                    display: `${filterOptionIndex == 0 ? "flex" : "none"}`,
                  }}
                >
                  <h3>All</h3>
                  <h3>Upcoming</h3>
                  <h3>Past</h3>
                  <h3>Date</h3>
                </div>
              </div>
              <div
                className="home-sidebar-filter-option"
                onClick={() => setFilterOptionIndex(1)}
                style={{
                  backgroundColor: `${
                    filterOptionIndex == 1 ? "" : "rgb(30, 30, 30)"
                  }`,
                  width: "13vw",
                }}
              >
                <h3>State</h3>
                <div
                  className="home-sidebar-filter-suboption"
                  style={{
                    display: `${filterOptionIndex == 1 ? "flex" : "none"}`,
                  }}
                >
                  <h3>Completed</h3>
                  <h3>Incomplete</h3>
                </div>
              </div>
              <div
                className="home-sidebar-filter-option"
                onClick={() => setFilterOptionIndex(2)}
                style={{
                  backgroundColor: `${
                    filterOptionIndex == 2 ? "" : "rgb(30, 30, 30)"
                  }`,
                  width: "13vw",
                }}
              >
                <h3>Status</h3>
                <div
                  className="home-sidebar-filter-suboption"
                  style={{
                    display: `${filterOptionIndex == 2 ? "flex" : "none"}`,
                  }}
                >
                  <h3>Accepted</h3>
                  <h3>Rejected</h3>
                  <h3>Hold</h3>
                </div>
              </div>
              <div
                className="home-sidebar-filter-option"
                onClick={() => setFilterOptionIndex(3)}
                style={{
                  backgroundColor: `${
                    filterOptionIndex == 3 ? "" : "rgb(30, 30, 30)"
                  }`,
                  width: "13vw",
                }}
              >
                <h3>Re Substitution</h3>
                <div
                  className="home-sidebar-filter-suboption"
                  style={{
                    display: `${filterOptionIndex == 3 ? "flex" : "none"}`,
                  }}
                >
                  <h3>Normal</h3>
                  <h3>Re-substitution</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-content">
          <div className="home-content-header">
            <div className="home-content-header-left"></div>
            <div className="home-content-header-right"></div>
            <div className="home-content-header-last">
              <svg
                className="power-icon"
                width="23px"
                height="23px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3V12M18.3611 5.64001C19.6195 6.8988 20.4764 8.50246 20.8234 10.2482C21.1704 11.994 20.992 13.8034 20.3107 15.4478C19.6295 17.0921 18.4759 18.4976 16.9959 19.4864C15.5159 20.4752 13.776 21.0029 11.9961 21.0029C10.2162 21.0029 8.47625 20.4752 6.99627 19.4864C5.51629 18.4976 4.36274 17.0921 3.68146 15.4478C3.00019 13.8034 2.82179 11.994 3.16882 10.2482C3.51584 8.50246 4.37272 6.8988 5.6311 5.64001"
                  stroke="rgb(170, 170, 170)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div
                className="home-content-header-last-hover"
                onClick={() => handleLogOut()}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
