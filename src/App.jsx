import { useState } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Loginpage from './pages/loginpage/loginpage'
import RegisterPage from './pages/registerpage/registerpage'

function App() {
  
  return (
   <Routes> 
    <Route path="/" element={<Loginpage/>} />
    <Route path="/login" element={<Loginpage/>} />
    <Route path="/register" element={<RegisterPage/>} />
   </Routes>
  )
}

export default App
