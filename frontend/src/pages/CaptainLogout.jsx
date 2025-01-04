import { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import toast from "react-hot-toast";

const CaptainLogout = () => {
  const navigate = useNavigate();
  const {setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted

    const logout = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/captains/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);

        if (response.status === 200 && isMounted) {
          setCaptain ({});
          localStorage.removeItem("token");
          toast.success(
            response.data.message || "Logout successful!"
          );
          navigate("/captain-login");
        }
      } catch (error) {
        console.log(error);
        if (error.response && isMounted) {
          // Handle specific error messages from the backend
          toast.error(
            error.response.data.message || "Logout failed. Please try again."
          );
        } else if (isMounted) {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    };

    logout();

    return () => {
      isMounted = false; // Cleanup function to set the flag to false when the component unmounts
    };
  }, [navigate, setCaptain ]);

  return <div></div>;
};

export default CaptainLogout