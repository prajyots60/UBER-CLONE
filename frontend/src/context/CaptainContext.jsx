/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CaptainDataContext = createContext();


const CaptainContext = ({children}) => {
  const [captain, setCaptain] = useState({
    fullname:{
      firstname:"",
      lastname:""
    },
    email: "",
    password: "",
    vehicle:{
      color:"",
      plate:"",
      capacity:0,  //number
      vehicleType:""
    }
  })

  return(
    <div>
      <CaptainDataContext.Provider value={{captain, setCaptain}}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  )
}

export default CaptainContext