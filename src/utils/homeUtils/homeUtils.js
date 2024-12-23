// homeUtils.js
import { supabase } from "../supabase.js";
import Cookies from "js-cookie";

// checkSession function
export const checkSession = (navigate) => {
  const authToken = Cookies.get("auth_token");
  const email = Cookies.get("email");

  if (!authToken || !email) {
    alert("Session expired. Please log in again");
    handleLogOut(navigate);
    navigate("/");
  }
};

// getUser function
export const getUser = async (useremail) => {
  const username = localStorage.getItem("username");
  const teacherData = localStorage.getItem("TeacherData");

  if (username && teacherData) {
    return {
      user: username,
      teacherData: JSON.parse(teacherData),
    };
  }

  const { data, error } = await supabase
    .from("Teachers")
    .select("*")
    .eq("email", useremail)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
    return { error };
  }

  if (data) {
    localStorage.setItem("username", data.name);
    localStorage.setItem("TeacherData", JSON.stringify(data));
    return {
      user: data.name,
      teacherData: data,
    };
  } else {
    return { error: "No user found with this email" };
  }
};

// getTimeTable function
export const getTimeTable = async () => {
  const unparsedTimeTable = localStorage.getItem("TeacherTimeTable");
  if (unparsedTimeTable) {
    return JSON.parse(unparsedTimeTable);
  }

  const unparsedTeacherId = localStorage.getItem("TeacherData");
  if (unparsedTeacherId) {
    const teacherID = JSON.parse(unparsedTeacherId)["id"];

    const { data, error } = await supabase
      .from("Classes")
      .select(`
        class_id,
        teacher_id,
        subject_id,
        start_time,
        end_time,
        duration,
        special_period,
        day_of_week,
        Subjects(subject_name)
      `)  
      .eq("teacher_id", teacherID);

    if (error) {
      console.log(error);
      return { error };
    }

    if (data) {
      // Structure the data as {[class_id]: {teacher_id, subject_name, start_time, ...}}
      const formattedData = data.reduce((acc, curr) => {
        acc[curr.class_id] = {
          teacher_id: curr.teacher_id,
          subject_name: curr.Subjects.subject_name,
          start_time: curr.start_time,
          end_time: curr.end_time,
          duration: curr.duration,
          special_period: curr.special_period,
          day_of_week: curr.day_of_week
        };
        return acc;
      }, {});

      // Save formatted data to localStorage
      localStorage.setItem("TeacherTimeTable", JSON.stringify(formattedData));

      return formattedData;
    }
  } else {
    console.log("Teacher data doesn't exist");
    return { error: "Teacher data not found" };
  }
};


// convertTimeTable function
export const convertTimeTable = (unpreparedTimeTable) => {
  if (unpreparedTimeTable) {
    // Example of data processing logic
    return unpreparedTimeTable.map(item => {
      return item;  // Modify each item as necessary
    });
  }
  return [];
};

// handleLogOut function
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

export const getPage = () => {
    const curPage = localStorage.getItem("page");
    if (curPage !== null) {
      return Number(curPage); 
    }
    localStorage.setItem("page", 0);
    return 0;
  };
  
  export const setPage = (page) => {
    const curPage = getPage();
    if (page === curPage) {
      return curPage; 
    }
    localStorage.setItem("page", page);
    return page; 
  };
  