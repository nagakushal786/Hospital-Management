import express from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { patientLogin, patientRegister } from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.post("/patient/register", catchAsyncErrors(patientRegister));
userRouter.post("/patient/login", catchAsyncErrors(patientLogin));

export default userRouter;