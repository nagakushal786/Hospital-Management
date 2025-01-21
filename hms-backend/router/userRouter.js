import express from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { addNewDoctor, adminLogout, adminRegister, getAllAdmins, getAllDoctors, getAllPatients, getUserDetails, patientLogin, patientLogout, patientRegister } from "../controllers/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/authUser.js";

const userRouter=express.Router();

userRouter.post("/admin/register", isAdminAuthenticated, catchAsyncErrors(adminRegister));
userRouter.get("/admin/getMe", isAdminAuthenticated, catchAsyncErrors(getUserDetails));
userRouter.get("/admin/allAdmins", catchAsyncErrors(getAllAdmins));
userRouter.post("/admin/addDoc", isAdminAuthenticated, catchAsyncErrors(addNewDoctor));
userRouter.get("/admin/logout", isAdminAuthenticated, catchAsyncErrors(adminLogout));

userRouter.post("/patient/register", catchAsyncErrors(patientRegister));
userRouter.get("/patient/getMe", isPatientAuthenticated, catchAsyncErrors(getUserDetails));
userRouter.get("/patient/allPatients", catchAsyncErrors(getAllPatients));
userRouter.get("/patient/logout", isPatientAuthenticated, catchAsyncErrors(patientLogout));

userRouter.post("/login", catchAsyncErrors(patientLogin));
userRouter.get("/doc/doctors", catchAsyncErrors(getAllDoctors));

export default userRouter;