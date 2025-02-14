import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Login.css"
const Signup = () => {
  const [input, setInput] = useState({
    username:"",
    email:"",
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SignupHandler = async (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log(input); // For debugging

    try {
      setLoading(true);
      const res = await axios.post(
        "https://netflix-sk1e.onrender.com/api/v1/user/signup",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span className="logo absolute font-bebas font-bold text-3xl text-white">
        SETFLIX
      </span>
      <div className="h-full flex justify-center bg-black bg-opacity-50">
        <div className="h-full w-full bg-black bg-opacity-50">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_large.jpg"
            alt="Background"
          />
        </div>
        <div className="blur absolute h-full w-full bg-black bg-opacity-50"></div>

        <div className="home flex justify-center bg-black bg-opacity-50">
          <form className="signin" onSubmit={SignupHandler}>
            <h2 className="text-white font-bold text-3xl">Sign up</h2>
            <div className="font-medium mb-4">
              <input
                type="text"
                name="username"
                value={input.username}
                onChange={changeEventHandler}
                placeholder="Name"
                className="signin h-12 w-full px-4 rounded-md bg-black bg-opacity-50 text-white text-lg placeholder-white border-solid border-4 border-red-600"
              />
            </div>
            <div className="font-medium mb-4 border-4 border-white">
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Email"
                className="h-12 w-full px-4 rounded-md text-white text-lg placeholder-white border-4 border-white bg-black bg-opacity-50"
              />
            </div>
            <div className="font-medium mb-4 border-4 border-white">
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Password"
                className="h-12 w-full px-4 rounded-md text-white text-lg placeholder-white border-4 border-white bg-black bg-opacity-50"
              />
            </div>

            <button
              type="submit"
              className="w-full mb-4 h-12 bg-red-600 hover:bg-red-700 transition text-white font-bold rounded"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="w-full text-center text-white">OR</div>
            <div className="w-full text-center text-white">Forgot password?</div>
            <div className="flex-col text-gray-400 text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
                <span className="text-white">Remember me</span>
              </label>
              <a href="#" className="hover:underline">
                Need help?
              </a>
            </div>
            <div className="text-gray-400 text-sm mt-6 text-center">
              You have already an account?{" "}
              <Link to="/Login" className="text-white hover:text-blue-600">
                Sign in now
              </Link>

            </div>
          </form>
          
        </div>
      </div>
      <div className="bg-black h-full w-full">
<footer className="footer w-full bg-black h-full text-gray-500 py-8 px-4">
  <div className=" max-w-screen-lg mx-auto text-center md:text-left">
    {/* Footer Text */}
    
    <p className=" text-sm text-white mb-4">
      Questions? Call <a href="tel:+18001234567" className="bottom text-gray-400 hover:underline">1-800-123-4567</a>
    </p>
    {/* Footer Links Grid */}
    <div className="grid grid-cols-3 sm:grid-cols-2 gap-5 text-sm">
      <a href="#" className="underline">FAQ</a>
      <a href="#" className="underline">Help Center</a>
      <a href="#" className="underline">Terms of Use</a>
      <a href="#" className="underline">Privacy</a>
      <a href="#" className="underline">Cookie Preferences</a>
      <a href="#" className="underline">Corporate Information</a>
    </div>

    {/* Language Selector */}
    <div className="mt-6">
      <select className="bg-black border border-gray-500 text-gray-500 text-sm px-4 py-2 rounded">
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  </div>
</footer>
</div>
    </>
  );
};

export default Signup;
