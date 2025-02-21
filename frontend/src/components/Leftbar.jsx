import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import "./Leftbar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import CSS for toast notifications

import {
  FaHome,
  FaSearch,
  FaDesktop,
  FaPlus,
  FaShare,
  FaSignOutAlt,
} from "react-icons/fa";

function Leftbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(null));  
        localStorage.removeItem("authUser");
        toast.success(res.data.message);

        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed!");
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
    } else if(textType==="desktop"){
      window.location.href = "/";
    }else if(textType==="Logout"){
      logoutHandler();
    }
    else if (textType === "Add") {
     // Example of opening a modal or triggering a specific action
     navigate("/addmovie")
    }
  };

  // Sidebar items with icons and labels
  const sidebarItems = [
    { icon: <FaSearch />, text: "Search" },
    { icon: <FaHome />, text: "Home" },
    { icon: <FaShare />, text: "Share" },
    { icon: <FaPlus />, text: "Add" },
    {icon:<FaDesktop />,text:"desktop"},
    // { icon: <FaSignOutAlt />, text: "Logout" },
  ];

  return (
    <div className="left flex hd:w-1/3 hd:flex hd:flex-row flex-col items-left justify-center h-full bg-black">
      {/* Map through the sidebar items */}
      {sidebarItems.map((item, key) => (
        <div
          key={key}
          onClick={() => sidebarHandler(item.text)}
          className="sidebar-item flex items-center hd:w-1/3 hd:mt-0 hd:flex-row space-x-4 text-white text-lg cursor-pointer hover:text-red-500 transition-all duration-200 mb-4"
        >
          <span className="ion text-white text-5xl mb-4">{item.icon}</span>
          
        </div>
      ))}
    </div>
  );
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
