import React from "react";
import BannerHome from "./BannerHome";
import MoviesList from "./MoviesList";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="bg-black">
      <BannerHome />
      <MoviesList />
      <Footer />
    </div>
  );
};

export default Home;
