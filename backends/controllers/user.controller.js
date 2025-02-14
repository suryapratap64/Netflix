import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { trace } from "console";
import { read } from "fs";
import jwt from "jsonwebtoken";
export const signup=async(req,res)=>{

    try{

        const{username,email,password}=req.body;
        if(!username||!email||!password){
            return res.status(401).json({
                message:"something went wrong or something is missing try again",
                success:false
            })
        }
        const user=await User.findOne({email})
        if(user){
            return res.status(401).json({
                message:"try different email",
                success:false
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({
            username,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
            message:"account created successfully",
            success:true,
        })


    }
    catch(error){
        console.log(error);
    }
 

}
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          message: "Something is missing",
          success: false
        });
      }
  
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "Incorrect email or password",
          success: false
        });
      }
  
      // Generate JWT Token
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1d'
      });
  
      // Send Cookie
      res.cookie("token", token, {
        httpOnly: true, // Prevents frontend JavaScript from accessing it
        secure: false,  // Set true for HTTPS
        sameSite: "lax", // Helps with cross-origin issues
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
  
      // Send response
      res.status(200).json({
        message: `Welcome back ${user.username}`,
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email
        }
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        success: false
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
 export const logout=async(__,res) =>{
    try{
        return res.cookie("cookie", " ",{maxAge:0}).json({
            message:"logout successfully",
            success:true
        })

    }
    catch(error){
        console.log(error);
    }
 }


