import express from "express";
import isAdmin from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";
const userRouter = express.Router();
import { getUser, getUserById, putChangeUserInfoById, deleteUserById, signInUser, signUpUser, putChangeUserProfile } from "../controllers/user.js";

userRouter.get("/", isAuth, isAdmin, getUser);
userRouter.get("/:id", isAuth, isAdmin, getUserById);
userRouter.put("/:id", isAuth, isAdmin, putChangeUserInfoById);
userRouter.delete("/:id", isAuth, isAdmin, deleteUserById);
userRouter.post("/signin", signInUser);
userRouter.post("/signup", signUpUser);
userRouter.put("/profile/:id", isAuth, putChangeUserProfile);

export default userRouter;
