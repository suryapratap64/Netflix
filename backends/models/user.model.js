import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{type:String,require:true,unique:false},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true,unique:false},
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    }
},
{
    timestamps:true,
}
)
export const User=mongoose.model('User',userSchema);