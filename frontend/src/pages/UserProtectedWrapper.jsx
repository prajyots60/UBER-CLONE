/* eslint-disable react/prop-types */
// import {useState, createContext} from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


const UserProtectedWrapper = ({children}) =>{
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return(
    <div>
      {children}
    </div>
  )
}

export default UserProtectedWrapper;