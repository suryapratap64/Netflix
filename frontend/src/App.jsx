import { Children } from "react";
import { createBrowserRouter, data, RouterProvider } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";

import Player from "./components/Player";

import SearchPage from "./components/SearchPage";

import Homepage from "./components/Homepage";
import MovieDetails from "./components/MovieDetails";
import BannerHome from "./components/BannerHome";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App(data) {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      
      children: [
        {
          path: "",
          element: <Homepage/> ,
        },

        
      
       
      ],
    },
    {
      path: "/signup",
      element:<Signup/> ,
    },
   
    {
      path: "/login",
      element:<Login/> ,
    },

   
    {
      path: "/player/:imdbID",
      element: <Player />,
    },
    {
      path: "/all",
      element: <MoviesList />,
    },
    {
      path: "/addmovie",
      element: <ProtectedRoutes><SearchPage /></ProtectedRoutes>,
    },
    
    {
      path: "/search",
      element: <MovieDetails></MovieDetails>,
    },
   
   
  ]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
