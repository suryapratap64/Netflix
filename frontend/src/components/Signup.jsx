import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Login.css";
import { API_URL } from "../config";
const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SignupHandler = async (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log(input); // For debugging
    if (!input.username || !input.email || !input.password || !input.role) {
      toast.error("Please fill all fields");
      return;
    }
    if (input.role == "admin") {
      toast.error("You are not allowed to sign up as admin");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/v1/user/signup`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

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
            {/* Sign Up Card */}
            <div className="bg-black bg-opacity-75 p-12 rounded-md shadow-2xl">
              <h1 className="text-white text-3xl font-bold mb-8">Sign Up</h1>

              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="username"
                    value={input.username}
                    onChange={changeEventHandler}
                    placeholder="Name"
                    className="w-full h-10 px-4 rounded-md bg-gray-700 bg-opacity-70 text-white text-base placeholder-gray-400 border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all"
                    required
                  />
                </div>

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

                {/* Role Select */}
                <div>
                  <select
                    name="role"
                    value={input.role}
                    onChange={changeEventHandler}
                    className="w-full h-10 px-4 rounded-md bg-gray-700 bg-opacity-70 text-white text-base border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all"
                    required
                  >
                    <option value="" className="bg-gray-800">
                      Select Role
                    </option>
                    <option value="admin" className="bg-gray-800">
                      Admin
                    </option>
                    <option value="user" className="bg-gray-800">
                      User
                    </option>
                  </select>
                </div>

                {/* Sign Up Button */}
                <button
                  onClick={SignupHandler}
                  disabled={loading}
                  className="w-full h-12 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-colors duration-200 mt-6"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>

                {/* OR Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-600"></div>
                  <div className="px-4 text-gray-400 text-sm">OR</div>
                  <div className="flex-1 border-t border-gray-600"></div>
                </div>

                {/* Additional Options */}
                <div className="flex items-center justify-between">
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

                {/* Sign In Link */}
                <div className="mt-16 text-gray-400">
                  <span className="text-gray-400">
                    Already have an account?{" "}
                  </span>
                  <a
                    href="/login"
                    className="text-white hover:underline font-medium"
                  >
                    Sign in now
                  </a>
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
  //     <span className="logo absolute font-bebas font-bold text-3xl text-white">
  //       SETFLIX
  //     </span>
  //     <div className="h-full flex justify-center bg-black bg-opacity-50">
  //       <div className="h-full w-full bg-black bg-opacity-50">
  //         <img
  //           src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_large.jpg"
  //           alt="Background"
  //         />
  //       </div>
  //       <div className="blur absolute h-full w-full bg-black bg-opacity-50"></div>

  //       <div className="home flex justify-center bg-black bg-opacity-50">
  //         <form className="signin" onSubmit={SignupHandler}>
  //           <h2 className="text-white font-bold text-3xl">Sign up</h2>
  //           <div className="font-medium mb-4">
  //             <input
  //               type="text"
  //               name="username"
  //               value={input.username}
  //               onChange={changeEventHandler}
  //               placeholder="Name"
  //               className="signin h-12 w-full px-4 rounded-md bg-black bg-opacity-50 text-white text-lg placeholder-white border-solid border-4 border-red-600"
  //             />
  //           </div>
  //           <div className="font-medium mb-4 border-4 border-white">
  //             <input
  //               type="email"
  //               name="email"
  //               value={input.email}
  //               onChange={changeEventHandler}
  //               placeholder="Email"
  //               className="h-12 w-full px-4 rounded-md text-white text-lg placeholder-white border-4 border-white bg-black bg-opacity-50"
  //             />
  //           </div>
  //           <div className="font-medium mb-4 ">
  //             <input
  //               type="password"
  //               name="password"
  //               value={input.password}
  //               onChange={changeEventHandler}
  //               placeholder="Password"
  //               className="h-12 w-full px-4 rounded-md text-white text-lg placeholder-white border-4 border-white bg-black bg-opacity-50"
  //             />
  //           </div>
  //           <div className="font-medium mb-4 border-4 border-white">
  //             <select
  //               name="role"
  //               value={input.role}
  //               onChange={changeEventHandler}
  //               className="h-12 w-full px-4 rounded-md text-white text-lg border-4 border-white bg-black bg-opacity-50"
  //             >
  //               <option value="" disabled>
  //                 Select Role
  //               </option>
  //               <option value="admin">Admin</option>
  //               <option value="user">User</option>
  //             </select>
  //           </div>

  //           <button
  //             type="submit"
  //             className="w-full mb-4 h-12 bg-red-600 hover:bg-red-700 transition text-white font-bold rounded"
  //           >
  //             {loading ? "Signing Up..." : "Sign Up"}
  //           </button>
  //           <div className="w-full text-center text-white">OR</div>
  //           <div className="w-full text-center text-white">
  //             Forgot password?
  //           </div>
  //           <div className="flex-col text-gray-400 text-sm">
  //             <label className="flex items-center space-x-2">
  //               <input type="checkbox" className="form-checkbox h-4 w-4" />
  //               <span className="text-white">Remember me</span>
  //             </label>
  //             <a href="#" className="hover:underline">
  //               Need help?
  //             </a>
  //           </div>
  //           <div className="text-gray-400 text-sm mt-6 text-center">
  //             You have already an account?{" "}
  //             <Link to="/Login" className="text-white hover:text-blue-600">
  //               Sign in now
  //             </Link>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //     <div className="bg-black h-full w-full">
  //       <footer className="footer w-full bg-black h-full text-gray-500 py-8 px-4">
  //         <div className=" max-w-screen-lg mx-auto text-center md:text-left">
  //           {/* Footer Text */}

  //           <p className=" text-sm text-white mb-4">
  //             Questions? Call{" "}
  //             <a
  //               href="tel:+18001234567"
  //               className="bottom text-gray-400 hover:underline"
  //             >
  //               1-800-123-4567
  //             </a>
  //           </p>
  //           {/* Footer Links Grid */}
  //           <div className="grid grid-cols-3 sm:grid-cols-2 gap-5 text-sm">
  //             <a href="#" className="underline">
  //               FAQ
  //             </a>
  //             <a href="#" className="underline">
  //               Help Center
  //             </a>
  //             <a href="#" className="underline">
  //               Terms of Use
  //             </a>
  //             <a href="#" className="underline">
  //               Privacy
  //             </a>
  //             <a href="#" className="underline">
  //               Cookie Preferences
  //             </a>
  //             <a href="#" className="underline">
  //               Corporate Information
  //             </a>
  //           </div>

  //           {/* Language Selector */}
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

export default Signup;
