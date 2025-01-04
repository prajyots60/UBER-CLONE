/* eslint-disable react/prop-types */
// import {useState, createContext} from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


const CaptainProtectedWrapper = ({children}) =>{
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
    }
  }, [token, navigate]);

  return(
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectedWrapper;