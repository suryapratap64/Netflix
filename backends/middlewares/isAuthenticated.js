import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({
        message: 'Please login first',
        success: false
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Invalid token',
        success: false
      });
    }
  } catch (error) {
    return res.status(500).json({
      me_ssage: 'Authentication error',
      success: false
    });
  }
};

export default isAuthenticated;
// import jwt from "jsonwebtoken";
// const isAuthenticated=async(req,res,next)=>{
//     try {
//         const token=req.cookies.token;
//         if(!token){
//             return res.status(401).json({
//                 message:'user not authenticated',
//                 success:false
//             })
//         }
//         const decode= jwt.verify(token,process.env.SECRET_KEY);
//         if(!decode){
//             return res.status(401).json({
//                 message:'Invalid ',
//                 success:false
//         })

//         }
//         req.id=decode.userId;
//         next();

        
//     } catch (error) {
//         console.log(error);
        
//     }
// }
// export default isAuthenticated;