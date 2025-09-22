import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import "./Leftbar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";

import {
  FaHome,
  FaSearch,
  FaDesktop,
  FaPlus,
  FaShare,
  FaSignOutAlt,
} from "react-icons/fa";
import { logoutUser } from "../redux/authSlice";
import { API_URL } from "../config";

function Leftbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/v1/user/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        // Clear Redux state
        dispatch(logoutUser());

        // Show success message
        toast.success("Logged out successfully");

        // Redirect to login
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed!");
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation or actions
  const sidebarHandler = (textType) => {
    if (textType === "Search") {
      navigate("/search");
    } else if (textType === "Home") {
      window.location.href = "/";
    } else if (textType === "Share") {
      navigate("/");
    } else if (textType === "desktop") {
      window.location.href = "/";
    } else if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Add") {
      // Example of opening a modal or triggering a specific action
      navigate("/addmovie");
    }
  };

  // Sidebar items with icons and labels
  const sidebarItems = [
    { icon: <FaSearch />, text: "Search" },
    { icon: <FaHome />, text: "Home" },
    { icon: <FaShare />, text: "Share" },
    { icon: <FaPlus />, text: "Add" },
    { icon: <FaDesktop />, text: "desktop" },

    // { icon: <FaSignOutAlt />, text: "Logout" },
  ];
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-16  bg-black flex-col items-center justify-center py-6 z-50 transition-all duration-300 ease-in-out ">
        {/* Main Navigation Items */}
        <div className="flex flex-col items-center space-y-6">
          {sidebarItems.map((item, key) => (
            <div
              key={key}
              onClick={() => sidebarHandler(item.text)}
              className="group flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
              title={item.text}
            >
              <div className="text-gray-300 my-2 group-hover:text-red-500 text-2xl transition-colors duration-200">
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button at Bottom */}
        <div
          onClick={logoutHandler}
          className="group flex flex-col items-center justify-center cursor-pointer transition-all my-5  duration-200 hover:scale-110"
          title="Logout"
        >
          <div className="text-gray-300 group-hover:text-red-500 text-2xl transition-colors duration-200">
            <FaSignOutAlt />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-black border-t border-gray-800 flex items-center justify-around px-2 z-50">
        {sidebarItems.map((item, key) => (
          <div
            key={key}
            onClick={() => sidebarHandler(item.text)}
            className="flex flex-col items-center justify-center flex-1 py-2 cursor-pointer group"
          >
            <div className="text-gray-300 group-hover:text-red-500 text-xl transition-colors duration-200">
              {item.icon}
            </div>
            <span className="text-xs text-gray-400 group-hover:text-red-500 mt-1 transition-colors duration-200">
              {item.text}
            </span>
          </div>
        ))}

        {/* Mobile Logout Button */}
        <div
          onClick={() => logoutHandler()}
          className="flex flex-col items-center justify-center flex-1 py-2 cursor-pointer group"
        >
          <div className="text-gray-300 group-hover:text-red-500 text-xl transition-colors duration-200">
            <FaSignOutAlt />
          </div>
          <span className="text-xs text-gray-400 group-hover:text-red-500 mt-1 transition-colors duration-200">
            Logout
          </span>
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16"></div>
    </>
  );
  // return (
  //   <div className="left">
  //     {/* Map through the sidebar items */}
  //     {sidebarItems.map((item, key) => (
  //       <div
  //         key={key}
  //         onClick={() => sidebarHandler(item.text)}
  //         className="sidebar-item "
  //       >
  //         <span className="ion">{item.icon}</span>

  //       </div>
  //     ))}
  //   </div>
  // );
}

export default Leftbar;

// import React, { useState } from 'react';
// import './Login.css'
// import {
//   FaHome,
//   FaSearch,
//   FaFilm,
//   FaDesktop,
//   FaChartLine,
//   FaPlus,
//   FaExchangeAlt,
//   FaPhone,
//   FaShare,
// } from 'react-icons/fa';

// function Leftbar() {

//   const [open,setOpen]=useState(false);
//   const sidebarHandler=(textType)=>{
//     if(textType==='Search'){
//       navigate("/search")
//     }
//     else if(textType==="Home"){
//       navigate("/home")
//     }
//     else if(textType==="Share"){
//       navigate("share")
//     }
//     else if(textType==="Add"){
//       setOpen(true);
//     }

//   }
//   const sidebarItems=[
//     { icon: <FaSearch  />,text:"Search"},
//     {icon: <FaHome />,text:"Home"},
//     {icon: <FaShare  />,text:"Share"},
//     {icon:  <FaPlus  />,text: "Add"}

//   ]
//   return (
//     <div className="left flex flex-col items-left justify-center h-screen bg-black">
//       {
//         sidebarItems.map((item,key)=>{
//           return(
//             <div  onClick={()=>sidebarHandler(item.text) } key={item.icon} className="left flex flex-col items-left justify-center h-screen bg-black" >
//               {item.icon}
//               <span>{item.text}</span>
//             </div>
//           )

//         })
//       }

//       <FaSearch className="ion text-white text-5xl mb-4" />
//       <FaHome className="ion text-white text-4xl mb-4" />
//       <FaFilm className="ion text-white text-4xl mb-4" />
//       <FaDesktop className="ion text-white text-4xl mb-4" />
//       <FaChartLine className="ion text-white text-4xl mb-4" />
//       <FaPlus className="ion text-white text-4xl mb-4" />

//       <FaShare className="ion text-white text-4xl mb-4" />
//     </div>
//   );
// }

// export default Leftbar;
