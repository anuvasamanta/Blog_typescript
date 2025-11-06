import express from "express";
import { studentController } from "../controller/UserController";

const userRouter = express.Router();

userRouter.post("/register", studentController.register);
userRouter.post("/login",studentController.login)
export { userRouter };