import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { supabase } from '../utils/supabase';
import TimeTableCard from './components/TimeTableCard';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);  
    const [userid, setUserid] = useState(null);
    const [timeTable, setTimeTable] = useState(null);
    const useremail = Cookies.get('email'); 
    const [keys, setKeys] = useState([]);
    const [changedTimeTable, setChangedTimeTable] = useState({});

   


    

    useEffect(() => {
        const getUser = async () => {
            // console.log('first useeffect');
            const { data, error } = await supabase
                .from('Teachers')
                .select('name')
                .eq('email', useremail)
                .single();

            if (error) {
                console.log("Error fetching data:", error);
                return;
            }

            if (data) {
                // Cookies.remove('email');
                localStorage.setItem('username', data.name);
                setUser(data.name);
            } else {
                console.log("No user found with this email");
            }
        };

        const username = localStorage.getItem('username');
        
        if (username) {
            setUser(username);
            setIsLoading(false);
        } else {
            if (useremail) {
                getUser();
            }
        }
    }, [useremail]);

    useEffect(() => {

        if (!user) {return}
        const getData = async () => {
            // console.log('second useeffect');
            const {data, error} = await supabase
            .from('Teachers')
            .select('*')
            .eq('email', useremail);

            if (data) {
                setUserid(data[0].id);
            } else {
                console.log(error);
            }

            // console.log(userid);

            
        }
        getData();
    }, [user]);

    useEffect(() => {
        const getTimeTable = async () => {
            const { data, error } = await supabase
          .from('Classes')
          .select(`
            class_id,
            teacher_id,
            subject_id,
            start_time,
            end_time,
            duration,
            day_of_week,
            special_period,
            Subjects (subject_name)
          `)
            .eq('teacher_id', userid);

            if (data) {
                setTimeTable(data);
            } else {
                console.log(error);
            }
        }

        getTimeTable();
        
    }, [userid])

    useEffect(() => {
        const changeDataTypeofTimeTable = () => {
            const groupedByDay = {};
    
            for (let key in timeTable) {
                const classItem = timeTable[key];
                const day = classItem.day_of_week;
    
                if (!groupedByDay[day]) {
                    groupedByDay[day] = [];
                }

                groupedByDay[day].push({
                    class_id: classItem.class_id,
                    teacher_id: classItem.teacher_id,
                    subject_id: classItem.subject_id,
                    start_time: classItem.start_time,
                    end_time: classItem.end_time,
                    duration: classItem.duration,
                    special_period: classItem.special_period,
                    subject_name: classItem.Subjects?.subject_name || 'N/A', 
                });
            }

            setChangedTimeTable(groupedByDay);
        };
    
        if (timeTable) {
            changeDataTypeofTimeTable();
        }
    }, [timeTable]);

    useEffect(() => {
        const generateKeys = () => {
            const keys = Object.keys(changedTimeTable);
            setKeys(keys);
        }
        generateKeys();
    }, [changedTimeTable])

    useEffect(() => {
        // console.log(changedTimeTable);
    });

    const handleLogOut = () => {
        Cookies.remove('auth_token');
        localStorage.removeItem('username');
        setUser('');
        setIsLoading(false);  
        navigate('/');
    };

 

    return (<>
    <div className='header'>
                <div className='hero'>
                    <strong>HELLO </strong>, {user || 'User'}
                </div>
                <div className='menu'>
                    Menu
                </div>
            </div>
        <div className='container'>
            <button onClick={handleLogOut}>Log Out</button>
            <div className='timetable-container'>
                <h1>TimeTable</h1>
                <div className='timetable-grid'>
                    {/* <TimeTableCard data={timeTable} type={'header'}></TimeTableCard> */}
                    <h1 className='timetable-header'>Week</h1>
                    <h1 style={{
                        gridRowStart: '2'
                    }} className='timetable-week'>Monday</h1>
                    <h1 style={{
                        gridRowStart: '3'
                    }} className='timetable-week'>Tuesday</h1>
                    <h1 style={{
                        gridRowStart: '4'
                    }} className='timetable-week'>Wednesday</h1>
                    <h1 style={{
                        gridRowStart: '5'
                    }} className='timetable-week'>Thrusday</h1>
                    <h1 style={{
                        gridRowStart: '6'
                    }} className='timetable-week'>Friday</h1>
                    <h2 className='timetable-header'>09:00 - 10:00</h2>
                    <h2 className='timetable-header'>10:00 - 11:00</h2>
                    <h2 className='timetable-header'>11:00 - 11:10</h2>
                    <h2 className='timetable-header'>11:10 - 12:10</h2>
                    <h2 className='timetable-header'>12:10 - 01:10</h2>
                    <h2 className='timetable-header'>01:10 - 02:10</h2>
                    <h2 className='timetable-header'>02:10 - 03:10</h2>
                    <h2 className='timetable-header'>03:10 - 04:10</h2>
                    
                    {Object.keys(changedTimeTable).map((day, index1) => {
                        return changedTimeTable[day].map((classItem, index2) => {
                            console.log(classItem.duration[1])
                            return (
                                <div key={`${index1}-${index2}`} className='timetable-cell' style={{
                                    gridColumn: `span ${classItem.duration[1]}`
                                }}>
                                    <h3>{classItem.subject_name}</h3>
                                    <h4>Info</h4>
                                </div>
                            );
                        });
                    })}
                    <h2 className='' style={{
                        gridColumnStart: "4",
                        gridRowStart: "2",
                        gridRowEnd: "7",
                        writingMode: "vertical-lr",
                        textOrientation: "mixed",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "gray"
                    }}>Break</h2>
                    <h2 className='' style={{
                        gridColumnStart: "7",
                        gridRowStart: "2",
                        gridRowEnd: "7",
                        writingMode: "vertical-lr",
                        textOrientation: "mixed",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "gray"
                        }}>LunchBreak</h2>

                </div>
            </div>
        </div>
        </>
    );
}

export default Home;
