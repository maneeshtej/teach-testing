import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login/login'
import Home from './Home/Home'
import SignUp from './Login/signup'
import ProtectedRoute from './utils/ProtectedRoute'
import Substitution from './Substitution/Substitution'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/home' 
          element={
            <ProtectedRoute><Home /></ProtectedRoute>
          }

          ></Route>
          <Route path='/substituion' element={
            <ProtectedRoute><Substitution /></ProtectedRoute>
          }> </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
