import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { CaptainDataContext } from "../context/CaptainContext"


function CaptainLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { setCaptain } = useContext(CaptainDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password
    }

    try {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

      console.log(response);

      if (response.status === 200) {
        const data = response.data.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        toast.success(data.message || "Login successful!");
        navigate('/captain-home');
      }
    } catch (error) {
      if (error.response) {
        // Handle specific error messages from the backend
        toast.error(error.response.data.message || "Login failed. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin