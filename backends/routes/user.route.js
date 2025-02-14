import express from "express";

const router=express.Router();
import { login,signup,logout, } from "../controllers/user.controller.js";
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout)
export default router