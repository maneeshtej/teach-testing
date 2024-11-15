import React, { useState } from 'react'
import './timetablecard.css'

function TimeTableCard({data, type}) {

    const [userData, setUserData] = useState(data);
    console.log(userData);
  return (
    <div className='timetable-card'>

    </div>
  )
}

export default TimeTableCard