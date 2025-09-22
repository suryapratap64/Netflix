import express from "express";
const router=express.Router();
import { login,signup,logout, } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated,logout)
export default router