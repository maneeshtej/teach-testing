import { supabase } from "../../utils/supabase";

export const convertTimeTable = () => {
    const timeTable = JSON.parse(localStorage.getItem('TeacherTimeTable'));
    const weekTimeTable = {}
    const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    if (!timeTable) {
        console.log('no timetable');
        return
    }

    for (const [key, value] of Object.entries(timeTable)) {
        if (!weekTimeTable[weeks[value.day_of_week]]) {
            weekTimeTable[weeks[value.day_of_week]] = []
        }

        weekTimeTable[weeks[value.day_of_week]].push([value.subject_name, value.class_id]);
        // console.log(weeks[value.day_of_week]);
    }

    // console.log(weekTimeTable);
    localStorage.setItem('weekTimeTable', JSON.stringify(weekTimeTable));
    return weekTimeTable
}

export const getTeachers = async () => {
    const {data, error} = await supabase
    .from("Teachers")
    .select('*')

    if (error) {
        alert(`Error : ${error}`);
    }

    localStorage.setItem('Teachers', JSON.stringify(data));

    return data;
}