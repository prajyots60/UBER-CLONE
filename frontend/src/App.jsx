
import {  Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'

function App() {
  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>

        <Route path='/' element={<Start />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />

      </Routes>
        
    </>
  )
}

export default App
