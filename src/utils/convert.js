export const convertTimetable = (timeTable) => {
    if (!timeTable || !Array.isArray(timeTable)) {
        return { data: null, error: "No valid timetable" };
    }

    const convertedTimetable = {};

    timeTable.forEach((item, index) => {
        // console.log(`Item ${index}:`, item);  // Log each item

        if (item && item.day_of_week) {
            if (!convertedTimetable[item.day_of_week]) {
                convertedTimetable[item.day_of_week] = [];
            }

            convertedTimetable[item.day_of_week].push(item);
        } else {
            console.error(`Missing 'day_of_week' at index ${index}:`, item);
        }
    });

    // console.log('Converted Timetable:', convertedTimetable);  
    return convertedTimetable;
};

export const prepareForSend = (selectedClasses) => {

    if (!selectedClasses) {
        return {data:null, error:"No input"}
    }

    try {
        const substitutions = Object.entries(selectedClasses).map(([key, value]) => {
            return {
              class_id: value.class_id,
              date_of_period: new Date(value.date).toISOString().split("T")[0], // Format as YYYY-MM-DD
              teacher_id: value.teacher_id,
              sub_teacher_id: parseInt(value.sub_teacher_id, 10),
              reason: "None",
              status: "pending", // Default value
              state: "incomplete", // Default value
              re_sub: false, // Default value
            };
          });

          return {data: substitutions, error:null};
    } catch (e) {
        return {data:null, error:e.message}
    }
    

}
