import express from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/authUser.js";
import { bookAppointment, deleteAppointment, getAllAppointments, updateAppointmentStatus } from "../controllers/appointmentController.js";

const appointmentRouter=express.Router();

appointmentRouter.post("/book", isPatientAuthenticated, catchAsyncErrors(bookAppointment));
appointmentRouter.get("/getAll", isAdminAuthenticated, catchAsyncErrors(getAllAppointments));
appointmentRouter.put("/update/:id", isAdminAuthenticated, catchAsyncErrors(updateAppointmentStatus));
appointmentRouter.delete("/delete/:id", isAdminAuthenticated, catchAsyncErrors(deleteAppointment));

export default appointmentRouter;