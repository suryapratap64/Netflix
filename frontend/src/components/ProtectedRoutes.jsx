import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);
  }, [user, navigate]);

  // Only render children if user is authenticated
  return isAuthenticated ? children : null;
};

export default ProtectedRoutes;
// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoutes = ({children}) => {
//     const {user}=useSelector(store=>store.auth);
//     const navigate=useNavigate();
//     useEffect(()=>{
//         if(!user){
//             navigate("/login")
//         }

//     },[])
//   return (
//     <>
//     {children}

//     </>

//   )
// }

// export default ProtectedRoutes
