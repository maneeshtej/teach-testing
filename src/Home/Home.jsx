import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { supabase } from '../utils/supabase';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);  // To handle loading state

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
                setUser(data.name);
            } else {
                console.log("No user found with this email");
            }
        };

        // Ensure `localStorage` access happens after page load
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

    const handleLogOut = () => {
        Cookies.remove('auth_token');
        localStorage.removeItem('username');
        setUser('');
        setIsLoading(false);  
        navigate('/');
    };

    if (isLoading) {
        return <div>Loading...</div>;  
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='hero'>
                    <strong>HELLO </strong>, {user || 'User'}
                </div>
                <div className='menu'>
                    Menu
                </div>
            </div>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    );
}

export default Home;
