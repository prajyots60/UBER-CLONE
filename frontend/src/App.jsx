
import {  Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import CaptainHome from './pages/CaptainHome';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper';
import UserLogout from './pages/UserLogout';
import CaptainLogout from './pages/CaptainLogout';

function App() {
  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>

        <Route path='/' element={<Start />} />

          <Route path='/home' element={
            <UserProtectedWrapper>
             <Home />
            </UserProtectedWrapper>
            } />
        
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/logout' element={<UserLogout />} />

        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        
           <Route path='/captain-home' element={
            <CaptainProtectedWrapper>
             <CaptainHome />
            </CaptainProtectedWrapper>
            } />

        <Route path='/captain-logout' element={<CaptainLogout />} />
        
      </Routes>
        
    </>
  )
}

export default App
