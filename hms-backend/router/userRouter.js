import express from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { adminLogout, adminRegister, getAllAdmins, getAllDoctors, getAllPatients, getUserDetails, patientLogin, patientLogout, patientRegister } from "../controllers/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/authUser.js";

const userRouter=express.Router();

userRouter.post("/patient/register", catchAsyncErrors(patientRegister));
userRouter.post("/login", catchAsyncErrors(patientLogin));
userRouter.post("/admin/register", isAdminAuthenticated, catchAsyncErrors(adminRegister));
userRouter.get("/doc/doctors", catchAsyncErrors(getAllDoctors));
userRouter.get("/admin/getMe", isAdminAuthenticated, catchAsyncErrors(getUserDetails));
userRouter.get("/patient/getMe", isPatientAuthenticated, catchAsyncErrors(getUserDetails));
userRouter.get("/admin/allAdmins", catchAsyncErrors(getAllAdmins));
userRouter.get("/patient/allPatients", catchAsyncErrors(getAllPatients));
userRouter.get("/admin/logout", isAdminAuthenticated, catchAsyncErrors(adminLogout));
userRouter.get("/patient/logout", isPatientAuthenticated, catchAsyncErrors(patientLogout));

export default userRouter;