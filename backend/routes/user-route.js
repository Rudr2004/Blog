import express from "express";
import {
  signUp,
  logIn,
  logOut,
  resetPassword,
} from "../controller/user-controller.js";
const userRouter = express.Router();

userRouter.post("/reset-password", resetPassword);
userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.post("/logout", logOut);

export default userRouter;
