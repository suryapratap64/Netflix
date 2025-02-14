import React from "react";

import { Outlet } from "react-router-dom";
import Leftbar from "./Leftbar";

import BannerHome from "./BannerHome";

import MovieSearch from "./MovieDetails";
import MovieDetails from "./MovieDetails";


import Footer from "./Footer";
import MoviesList from "./MoviesList";
import "./BannerHome.css";

const Homepage = () => {
  return (
    <main className="backg">
      <Leftbar />
      <BannerHome/>
      
      <div >
        <Outlet />
      </div>
      <MoviesList/>
      <Footer/>
    
     
    </main>
  );
};

export default Homepage;
