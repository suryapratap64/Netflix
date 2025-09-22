import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import { API_URL } from "../config";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const LoginHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      console.log("Attempting login to:", `${API_URL}/api/v1/user/login`);

      const res = await axios.post(`${API_URL}/api/v1/user/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Login response:", res.data);

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);

        setInput({
          email: "",
          password: "",
        });

        // Navigate after state updates
        setTimeout(() => navigate("/"), 100);
      } else {
        // Handle case where success is false but no error was thrown
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
        },
      });

      let errorMessage;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage =
          error.response.data?.message || `Error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Please check your connection.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = "Failed to send login request. Please try again.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background Container */}
      <div className="min-h-screen relative bg-black">
        {/* Netflix Logo */}
        <div className="absolute top-6 left-6 z-20">
          <span className="font-bold text-3xl text-red-600 tracking-wider">
            SETFLIX
          </span>
        </div>

        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_large.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md">
            {/* Login Card */}
            <div className="bg-black bg-opacity-75 p-12 rounded-md shadow-2xl">
              <h1 className="text-white text-3xl font-bold mb-2">Sign In</h1>
              <p className="text-gray-400 text-sm mb-8">Login to add movies</p>

              <div className="space-y-4">
                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="Email or phone number"
                    className="w-full h-10 px-4 rounded-md bg-gray-700 bg-opacity-70 text-white text-base placeholder-gray-400 border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all"
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="Password"
                    className="w-full h-10 px-4 rounded-md bg-gray-700 bg-opacity-70 text-white text-base placeholder-gray-400 border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all"
                    required
                  />
                </div>

                {/* Sign In Button */}
                <button
                  onClick={LoginHandler}
                  disabled={loading}
                  className="w-full h-12 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-colors duration-200 mt-6"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                {/* Forgot Password */}
                <div className="text-center mt-4">
                  <a href="#" className="text-white hover:underline text-sm">
                    Forgot password?
                  </a>
                </div>

                {/* Remember Me and Need Help */}
                <div className="flex items-center justify-between mt-6">
                  <label className="flex items-center text-gray-300 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                    />
                    Remember me
                  </label>
                  <a href="#" className="text-gray-300 text-sm hover:underline">
                    Need help?
                  </a>
                </div>

                {/* Sign Up Link */}
                <div className="mt-16 text-gray-400">
                  <span className="text-gray-400">New to Setflix? </span>
                  <a
                    href="/signup"
                    className="text-white hover:underline font-medium"
                  >
                    Sign up now
                  </a>
                </div>

                {/* Admin Notice */}
                <div className="mt-4 text-xs text-gray-400 bg-gray-800 bg-opacity-40 p-3 rounded border border-gray-600">
                  <p className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Movies can only be added by admin accounts
                  </p>
                </div>

                {/* Terms Text */}
                <div className="mt-4 text-xs text-gray-400">
                  <p>
                    This page is protected by Google reCAPTCHA to ensure you're
                    not a bot.{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Learn more
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 bg-black bg-opacity-75 border-t border-gray-800">
          <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-gray-400 text-sm">
              <p className="mb-6">
                Questions? Call{" "}
                <a href="tel:+18001234567" className="hover:underline">
                  1-800-123-4567
                </a>
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <a href="#" className="hover:underline">
                  FAQ
                </a>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
                <a href="#" className="hover:underline">
                  Terms of Use
                </a>
                <a href="#" className="hover:underline">
                  Privacy
                </a>
                <a href="#" className="hover:underline">
                  Cookie Preferences
                </a>
                <a href="#" className="hover:underline">
                  Corporate Information
                </a>
                <a href="#" className="hover:underline">
                  Ad Choices
                </a>
                <a href="#" className="hover:underline">
                  Do Not Sell My Info
                </a>
              </div>

              <div className="mb-6">
                <select className="bg-transparent border border-gray-600 text-gray-400 text-sm px-4 py-2 rounded">
                  <option value="en" className="bg-gray-800">
                    English
                  </option>
                  <option value="es" className="bg-gray-800">
                    Español
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <span className="logo absolute font-bebas font-bold text-3xl text-white float-start">SETFLIX</span>
  //     <div className="h-full flex justify-center bg-black bg-opacity-50">
  //       <div className="h-full w-full bg-black bg-opacity-50">
  //         <img
  //           src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_large.jpg"
  //           alt="Background"
  //         />
  //       </div>
  //       <div className="blur absolute h-full w-full bg-black bg-opacity-50"></div>
  //       <div className="home flex justify-center bg-black bg-opacity-50">
  //         <form className="signin" onSubmit={LoginHandler}>
  //           <h2 className="text-white font-bold text-3xl">Login For Add Movie</h2>
  //           <div className="font-medium mb-4">
  //             <input
  //               type="email"
  //               name="email"
  //               value={input.email}
  //               onChange={changeEventHandler}
  //               placeholder="Email or phone number"
  //               className="signin h-12 w-full px-4 rounded-md bg-black bg-opacity-50 text-white text-lg placeholder-white border-solid border-4 border-red-600"
  //             />
  //           </div>
  //           <div className="font-medium mb-4">
  //             <input
  //               type="password"
  //               name="password"
  //               value={input.password}
  //               onChange={changeEventHandler}
  //               placeholder="Password"
  //               className="h-12 w-full px-4 rounded-md text-white text-lg placeholder-white border-4 border-white bg-black bg-opacity-50"
  //             />
  //           </div>
  //           <button
  //             type="submit"
  //             className="w-full mb-4 h-12 bg-red-600 hover:bg-red-700 transition text-white font-bold rounded"
  //             disabled={loading}
  //           >
  //             {loading ? "Signing In..." : "Sign In"}
  //           </button>
  //           <div className="w-full text-center text-white">OR</div>
  //           <div className="w-full text-center text-white">Forgot password?</div>
  //           <div className="flex-col text-gray-400 text-sm">
  //             <label className="flex items-center space-x-2">
  //               <input type="checkbox" className="form-checkbox h-4 w-4" />
  //               <span className="text-white">Remember me</span>
  //             </label>
  //             <a href="#" className="hover:underline">Need help?</a>
  //           </div>
  //           <div className="text-gray-400 text-sm mt-6 text-center">
  //             Movie add only admin ?{" "}
  //             {/* <Link to="/signup" className="text-white hover:underline">Sign up now</Link>. */}
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //     <div className="bg-black h-full w-full">
  //       <footer className="footer w-full bg-black h-full text-gray-500 py-8 px-4">
  //         <div className="max-w-screen-lg mx-auto text-center md:text-left">
  //           <p className="text-sm text-white mb-4">
  //             Questions? Call{" "}
  //             <a href="tel:+18001234567" className="text-gray-400 hover:underline">1-800-123-4567</a>
  //           </p>
  //           <div className="grid grid-cols-3 sm:grid-cols-2 gap-5 text-sm">
  //             <a href="#" className="underline">FAQ</a>
  //             <a href="#" className="underline">Help Center</a>
  //             <a href="#" className="underline">Terms of Use</a>
  //             <a href="#" className="underline">Privacy</a>
  //             <a href="#" className="underline">Cookie Preferences</a>
  //             <a href="#" className="underline">Corporate Information</a>
  //           </div>
  //           <div className="mt-6">
  //             <select className="bg-black border border-gray-500 text-gray-500 text-sm px-4 py-2 rounded">
  //               <option value="en">English</option>
  //               <option value="es">Español</option>
  //             </select>
  //           </div>
  //         </div>
  //       </footer>
  //     </div>
  //   </>
  // );
};

export default Login;
