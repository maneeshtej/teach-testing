import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate, useSearchParams } from 'react-router-dom';
import './home.css'
import { supabase } from '../utils/supabase';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const useremail = Cookies.get('email');
    
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
                Cookies.remove('email');
                localStorage.setItem('username', data.name);
            } else {
                console.log("No user found with this email");
            }
        };

        const username = localStorage.getItem('username')

        if (useremail && !username) {
            getUser();
        } 

        if (username) {
            setUser(username);
        }

    }, [useremail]);

    const handleLogOut = () => {
        Cookies.remove('auth_token');
        localStorage.removeItem('username');
            navigate('/');
    }
  return (
    <div className='container'>
        <div className='header'>
            <div className='hero'><strong>HELLO </strong>, {user}</div>
            <div className='menu'>
                Menu
            </div>
        </div>
    <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Home