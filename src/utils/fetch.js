import { supabase } from "./supabase";

export const getTeacherDetails = async ({paramName, param}) => {
    try {
        if (!param || !paramName) {
            throw new Error("Param are required");
        }

        let data, error, query;
        if (paramName === "Id") {
            query = supabase
            .from('Teachers')
            .select('*')
            .eq('id', param); 
        } else if (paramName === "email") {
            query = supabase
            .from('Teachers')
            .select('*')
            .eq('email', param); 
        } else {
            console.error("Invalid paramName or param");
            return null;
        }

       ({data, error} = await query);

        if (error) {
            console.error("Error fetching teacher details:", error);
            return null;
        }

        if (data) {
            return data;
        }

        return null;
    } catch (e) {
        console.error("Unexpected error:", e);
        return null;
    }
};

export const getTeacherSubstitutions = async (id) => {
    try {
      if (!id) {
        return { data: null, error: "Please enter ID" };
      }
  
      const { data, error } = await supabase
        .from("Substitution")
        .select(
          `
              *,
              teacher:teacher_id(name),
              sub_teacher:sub_teacher_id(name),
              class:class_id(
                  subject_id,
                  subject:subject_id(subject_name)
              )`
        )
        .or(`teacher_id.eq.${id},sub_teacher_id.eq.${id}`);
  
      if (error) {
        return { data: null, error: error.message || "Error fetching data" };
      }
  
      const newData = [];
  
      data.forEach((item) => {
        const tempData = {
          ...item,
          subject_name: item?.class?.subject?.subject_name || null,
          subject_id: item?.class?.subject_id || null,
          teacher_name: item?.teacher?.name || null,
          sub_teacher_name: item?.sub_teacher?.name || null,
        };
  
        // Clean up unused properties
        delete tempData.class;
        delete tempData.sub_teacher;
        delete tempData.teacher;
  
        newData.push(tempData);
      });
  
      return { data: newData, error: null };
    } catch (e) {
      console.error("Error in fetch.js", e);
      return { data: null, error: e.message || "Unexpected error" };
    }
  };
  

export const getTeacherName = async (id) => {
    try {
        if (!id) {
            return {data: null, error: "Please enter ID"};
        }

        const {data, error} = await supabase
        .from('Teachers')
        .select('name')
        .eq('id', id);

        if (error) {
            return {data: null, error: e.message || "Error Fetching data "};
        }

        return {data, error: null};
    } catch (e) {
        return {data: null, error: e.message || "Unexpected error"}
    }
}

export const getTeacherTimetable = async (id) => {
    try {
        if (!id) {
            return {date:null, error: "Please enetr ID"};
        }

        const {data, error} = await supabase
        .from('Classes')
        .select('*, Subjects:subject_id(subject_name)')
        .eq('teacher_id', id);

        const newData = [];

        if (error) {
            return {data: null, error: error.message};
        }

        data.forEach((item, index) => {
            const tempData = {
                ...data[index],
                subject_name: data[index].Subjects.subject_name
            }

            delete tempData.Subjects;

            newData.push(tempData);
        })


        return {data: newData, error: null};


    } catch (e) {
        return {data: null, error: e.message || "Unexpected error"};
    }
}

export const fetchAllTeachers = async () => {

    try {
        const {data, error} = await supabase
    .from('Teachers')
    .select('*');

    if (error) {
        return {data: null, error:error.message}
    }

    if (data) {
        return {data, error:null}
    }
    } catch (e) {
        return {data: null, error: e.message};
    }
    
}


