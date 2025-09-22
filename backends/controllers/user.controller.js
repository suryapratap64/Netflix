import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { trace } from "console";
import { read } from "fs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(401).json({
        message: "something went wrong or something is missing try again",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "try different email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      message: "account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Generate JWT Token
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Set Cookie and Send Response
    res
      .cookie("token", token, {
        httpOnly: true, // Prevents frontend JavaScript from accessing it
        secure: false, // Set true for HTTPS
        sameSite: "lax", // Helps with cross-origin issues
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// export const login=async(req,res)=>{
//    try{
// const{email,password}=req.body;
// if(!email||!password){
//     return res.status(401).json({
//         message:"something is missing",
//         success:false
//     })
// }
// let user=await User.findOne({email});
// if(!user){
//     return res.status(401).json({
//         message:"Incorrect email or password",
//         success:false
//     })
// }
// const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
// user = {
//     _id: user._id,
//     username: user.username,
//     email: user.email

// }
// return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
//     message: `Welcome back ${user.username}`,
//     success: true,
//     user
// });

//    }
//    catch(error){
//     console.log(error);
//    }

// }
// maxAge specifies the duration (in milliseconds) for which the cookie should remain valid before it is automatically deleted by the browser
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
      expires: new Date(0),
    });

    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Error during logout",
      success: false,
    });
  }
};
