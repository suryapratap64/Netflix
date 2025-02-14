import {uploadVideo,streamVideo}from "../controllers/video.controller.js"
import express from "express";

import upload from "../middlewares/multer.js"

const router = express.Router();

router.route('/upload')
  .post(upload.single('video'), uploadVideo);
router.route("/stream").get(streamVideo);


export default router