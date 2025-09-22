import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Player from "./components/Player";
import SearchPage from "./components/SearchPage";
import Homepage from "./components/Homepage";
import MovieDetails from "./components/MovieDetails";
import BannerHome from "./components/BannerHome";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import Home from "./components/Home";
import "./App.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";

function App(data) {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes>
          <Homepage />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "player/:imdbID",
          element: <Player />,
        },
        {
          path: "all",
          element: <MoviesList />,
        },
        {
          path: "addmovie",
          element: <SearchPage />,
        },
        {
          path: "search",
          element: <MovieDetails />,
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={browserRouter} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
