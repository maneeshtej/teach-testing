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
