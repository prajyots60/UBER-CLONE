/* eslint-disable react/prop-types */

import { useEffect, useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainProtectedWrapper = ({children}) =>{
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const {setCaptain} = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
    }
  }, [token, navigate]);

  axios.get(`${import.meta.env.VITE_API_BASE_URI}/captains/profile`, 
    {headers: {Authorization: `Bearer ${token}`}})
    .then((response) => {
    if (response.status === 200) {
      setCaptain(response.data.captain);
      setLoading(false);
    }
  })
  .catch((error) => {
    console.log(error)
    localStorage.removeItem('token');
    navigate('/captain-login')
  });

  if(loading){
    return (
      <div>
        Loading...
      </div>
    )
  }

  return(
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectedWrapper;