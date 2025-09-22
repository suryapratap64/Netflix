import React from "react";
import { Outlet } from "react-router-dom";
import Leftbar from "./Leftbar";
import "./Leftbar.css";

const Homepage = () => {
  return (
    <main className="bg-black min-h-screen">
      <Leftbar />
      <div className="md:ml-16">
        {" "}
        {/* Add margin to account for sidebar width */}
        <Outlet />
      </div>
    </main>
  );
};

export default Homepage;
