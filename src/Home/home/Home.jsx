import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { checkSession, handleLogOut } from "../../Login/login.js";
import { getTeacherDetails } from "../../utils/fetch.js";
import "./home.css";
import HomeContent from "../content/HomeContent.jsx";

function Home({ toggleNavigateAnim }) {
  const navigate = useNavigate();
  const useremail = Cookies.get("email");
  const [filterIndex, setFilterIndex] = useState(0);
  const [teacherData, setTeacherData] = useState();
  const [teacherID, setTeacherID] = useState();
  const [teacherName, setTeacherName] = useState();
  const homeContentRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = homeContentRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    homeContentRef.current.style.setProperty("--x", `${x}px`);
    homeContentRef.current.style.setProperty("--y", `${y}px`);
  };

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const data = await getTeacherDetails({
          paramName: "email",
          param: useremail,
        });
        if (data) {
          setTeacherData(data);
        }
      } catch (e) {
        console.error(error);
      }
    };

    fetchTeacherData();
  }, [useremail]);

  useEffect(() => {
    if (teacherData) {
      setTeacherID(teacherData["0"].id);
      setTeacherName(teacherData["0"].name);
    }
    // console.log(teacherData);
  }, [teacherData]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkSession(navigate);
    }, 5000);

    return () => clearInterval(interval);
  }, [useremail, navigate]);

  // console.log(teacherData);

  return (
    <div>
      <section className="home-main">
        <div className="home-sidebar">
          <div className="home-sidebar-header">Teacher Substitution</div>
          <div className="home-sidebar-items">
            <div className="home-sidebar-item">
              <div className="sidebar-item-searchbox">
                <div className="sidebar-item-search">
                  <svg
                    width="15px"
                    height="15px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                      stroke="rgb(170, 170, 170)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input placeholder="Add New"></input>
                </div>
              </div>
            </div>
            <div className="home-sidebar-item">
              <div className="sidebar-item-filters">
                <div
                  className={`sidebar-item-filter`}
                  onClick={() => setFilterIndex(0)}
                >
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={filterIndex === 0 ? "item-filter-svg-anim" : ""}
                  >
                    <path
                      d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                      stroke={
                        filterIndex === 0
                          ? "rgb(0, 205, 137)"
                          : "rgb(170, 170, 170)"
                      }
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className={
                        filterIndex === 0 ? "item-filter-stroke-anim" : ""
                      }
                    />
                    <path
                      d="M12 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V12"
                      stroke={
                        filterIndex === 0
                          ? "rgb(0, 205, 137)"
                          : "rgb(170, 170, 170)"
                      }
                      stroke-width="2"
                      stroke-linecap="round"
                      className={
                        filterIndex === 0 ? "item-filter-stroke-anim" : ""
                      }
                    />
                    <path
                      d="M21 17L16 17M16 17L18 19M16 17L18 15"
                      stroke={
                        filterIndex === 0
                          ? "rgb(0, 205, 137)"
                          : "rgb(170, 170, 170)"
                      }
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className={
                        filterIndex === 0 ? "item-filter-stroke-anim" : ""
                      }
                    />
                  </svg>
                  <h3>Inbox</h3>
                </div>

                <div
                  className="sidebar-item-filter"
                  onClick={() => setFilterIndex(1)}
                >
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={filterIndex == 1 ? "item-filter-svg-anim" : ""}
                  >
                    <path
                      d="M14.5 1.5L0.5 6.5L4.5 8.5L10.5 4.5L6.5 9.5L12.5 13.5L14.5 1.5Z"
                      stroke={
                        filterIndex == 1
                          ? "rgb(0, 205, 137)"
                          : "rgb(170, 170, 170)"
                      }
                      stroke-linejoin="round"
                    />
                  </svg>
                  <h3>Sent</h3>
                </div>

                <div
                  className="sidebar-item-filter"
                  onClick={() => setFilterIndex(2)}
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={filterIndex == 2 ? "item-filter-svg-anim" : ""}
                  >
                    <path
                      d="M6 18.5V9.62132C6 9.2235 6.15803 8.84197 6.43934 8.56066L10.5607 4.43934C10.842 4.15804 11.2235 4 11.6213 4H16.5C17.3284 4 18 4.67157 18 5.5V18.5C18 19.3284 17.3284 20 16.5 20H7.5C6.67157 20 6 19.3284 6 18.5Z"
                      stroke={
                        filterIndex == 2
                          ? "rgb(0, 205, 137)"
                          : "rgb(170, 170, 170)"
                      }
                      stroke-width="2"
                    />
                    <path
                      d="M6 10H10.5C11.3284 10 12 9.32843 12 8.5V4"
                      stroke={
                        filterIndex == 2
                          ? "rgb(0, 205, 137)"
                          : "rgb(170, 170, 170)"
                      }
                      stroke-width="1.5"
                    />
                  </svg>
                  <h3>Draft</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="home-sidebar-footer">
            <h3>{teacherName}</h3>
          </div>
        </div>
        <div
          className="home-content"
          ref={homeContentRef}
          onMouseMove={handleMouseMove}
        >
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
          <div className="home-content body">
            <HomeContent
              tName={teacherName}
              tID={teacherID}
              toggleNavigateAnim={toggleNavigateAnim}
            ></HomeContent>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
