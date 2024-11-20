import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { supabase } from '../utils/supabase';
import TimeTable from './components/TimeTable';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);  
    const [userid, setUserid] = useState(null);
    const [timeTable, setTimeTable] = useState(null);
    const useremail = Cookies.get('email'); 
    const [changedTimeTable, setChangedTimeTable] = useState({});
    const today = new Date();
    const todayWeek = today.getDay();

    useEffect(() => {
        const getUser = async () => {
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
        if (!user) { return; }
        const getData = async () => {
            const {data, error} = await supabase
            .from('Teachers')
            .select('*')
            .eq('email', useremail);

            if (data) {
                setUserid(data[0].id);
            } else {
                console.log(error);
            }
        };
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
            .eq('teacher_id', userid)
            .order('day_of_week', {ascending: true})
            .order('start_time', {ascending: true});

            if (data) {
                setTimeTable(data);
            } else {
                console.log(error);
            }
        };

        if (userid) getTimeTable();
    }, [userid]);

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
                    day_of_week: day,
                });
            }

            setChangedTimeTable(groupedByDay);
        };

        if (timeTable) {
            changeDataTypeofTimeTable();
        }
    }, [timeTable]);

    const handleLogOut = () => {
        Cookies.remove('auth_token');
        localStorage.removeItem('username');
        setUser('');
        setIsLoading(false);  
        navigate('/');
    };

    const handleLinkToSubstitution = () => {
        navigate('/substituion');
    }

    return (
        <>
            <div className='header'>
                <div className='hero'>
                    <strong>HELLO </strong>, {user || 'User'}
                </div>
                <div className='header-options'>
                    <h3 onClick={handleLinkToSubstitution}>SUBSTITUTION</h3>
                    <h3 onClick={handleLogOut}>LOG OUT</h3>
                    <h3>MENU</h3>
                </div>
                

            </div>
            <div className='container'>
                <div className='timetable-container'>
                    <h1>TimeTable</h1>
                    <TimeTable changedTimeTable={changedTimeTable} today={today} todayWeek={todayWeek} />
                </div>
            </div>
        </>
    );
}

export default Home;
