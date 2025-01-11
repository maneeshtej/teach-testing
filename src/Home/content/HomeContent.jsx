import { useState, useEffect } from "react";
import { getTeacherSubstitutions } from "../../utils/fetch";
import "./homecontent.css";
import SubstitutionCard from "./components/SubstitutionCard";
import { Route, useNavigate } from "react-router-dom";

function HomeContent({ tID, tName, filterParam, handleNavigateAnim, setAnim }) {
  const teacherID = tID;
  const teacherName = tName;
  const [teacherSubstitutions, setTeacherSubstitutions] = useState();
  const [error, setError] = useState(null);
  const naviagate = useNavigate();
  const [filter, setFilter] = useState("sent");

  useEffect(() => {
    if (filterParam === 1) {
      setFilter("sent");
    } else if (filterParam === 0) {
      setFilter("recieved");
    } else {
      setFilter("draft");
    }
  }, [filterParam]);

  useEffect(() => {
    const getSubstitutions = async (teacherID) => {
      try {
        if (!teacherID) {
          setError("Please enter ID");
          return;
        }

        const { data, error } = await getTeacherSubstitutions(teacherID);

        if (error) {
          setError(error);
          return;
        }

        if (data) {
          setTeacherSubstitutions(data);
          localStorage.setItem("teacherSubstitution", JSON.stringify(data));
        }
      } catch (e) {
        setError(e.message || "Error fetching substitutions");
      }
    };

    getSubstitutions(teacherID);
  }, [teacherID]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {}, [teacherSubstitutions]);

  const subFilter = (sub) => {
    const type = filter;
    const data = teacherSubstitutions[sub];
    if (!type || !data || !teacherID) {
      console.error("input error");
      return;
    }

    if (type == "sent") {
      // console.log("sub data", teacherSubstitutions[data]);
      if (!data.teacher_id) {
        console.error("teacherID not present in data");
        return;
      }
      if (data.teacher_id == teacherID) {
        return true;
      }
    } else if (type == "recieved") {
      if (!data.teacher_id) return;
      if (data.sub_teacher_id == teacherID) {
        return true;
      }
    } else {
      return false;
    }
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="content-header-left">
          <div className="header-left-searchbox">
            <div className="header-left-search">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input></input>
            </div>
          </div>
        </div>
        <div className="content-header-right">
          <div className="header-right-items">
            <div className="header-right-item">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="header-hide-icon"
              >
                <g id="Edit / Hide">
                  <path
                    id="Vector"
                    d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
              <span>Hide</span>
            </div>
            <div className="header-right-item">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="header-edit-icon"
              >
                <title />

                <g id="Complete">
                  <g id="edit">
                    <g>
                      <path
                        d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />

                      <polygon
                        fill="none"
                        points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <span>Edit</span>
            </div>
            <div className="header-right-item">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 1024 1024"
                fill="#000000"
                class="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="header-delete-icon"
              >
                <path
                  d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z"
                  fill=""
                />
                <path
                  d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z"
                  fill=""
                />
              </svg>
              <span>Delete</span>
            </div>
            <div
              className="header-right-item add"
              onClick={() => {
                // toggleNavigateAnim();
                // setTimeout(() => {
                //   naviagate("/simplest", { state: { teacherID } });
                // }, 200);
                handleNavigateAnim(
                  "/simplest",
                  { teacherID: teacherID },
                  setAnim,
                  "toLeft"
                );
              }}
            >
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="header-new-icon"
              >
                <path
                  d="M4 12H20M12 4V20"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>New</span>
            </div>
          </div>
        </div>
      </div>
      <div className="content-subcard-wrapper">
        <div className="content-subcard-header"></div>
        <SubstitutionCard
          subData={teacherSubstitutions}
          index={true}
        ></SubstitutionCard>
        {teacherSubstitutions &&
        Object.keys(teacherSubstitutions).length > 0 ? (
          Object.keys(teacherSubstitutions).map((sub, index) => {
            if (subFilter(sub)) {
              return (
                <SubstitutionCard
                  subData={teacherSubstitutions[sub]}
                  index={false}
                  number={index}
                  key={index}
                ></SubstitutionCard>
              );
            } else {
              return <></>;
            }
          })
        ) : (
          <p
            style={{
              color: "white",
            }}
          >
            Loading...
          </p>
        )}
      </div>

      <div className="content-footer"></div>
    </div>
  );
}

export default HomeContent;
