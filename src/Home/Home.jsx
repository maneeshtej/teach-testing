import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        Cookies.remove('auth_token');
            navigate('/');
    }
  return (
    <div style={{
        cursor: 'pointer',
    }} 
    onClick={handleLogOut}>Log Out</div>
  )
}

export default Home