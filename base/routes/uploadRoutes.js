import express from "express";
import isAdmin from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";
import multer from "multer";
const upload = multer();
import uploadFileCloudinary from "../controllers/upload.js";
const uploadRouter = express.Router();

uploadRouter.post("/", isAuth, isAdmin, upload.single("file"), uploadFileCloudinary);

export default uploadRouter;
