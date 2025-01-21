import ErrorHandler from "../middlewares/errorMiddleware.js";
import { appointmentModel } from "../models/appointmentSchema.js";
import { userModel } from "../models/userSchema.js";

export const bookAppointment=async (req, res, next)=> {
    const {firstName, lastName, email, phone, aadhar, dob, gender, appointmentDate, department, doctor_firstName, doctor_lastName, hasVisited, address}=req.body;

    if(!firstName || !lastName || !email || !phone || !aadhar || !dob || !gender || !appointmentDate || !department || !doctor_firstName || !doctor_lastName || !address){
        return next(new ErrorHandler("Please fill all the required details", 400));
    }

    const isConflict=await userModel.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    });

    if(isConflict.length===0){
        return next(new ErrorHandler("Doctor not found", 400));
    }
    if(isConflict.length>1){
        return next(new ErrorHandler("Doctors Conflict! Please contact through mail or phone", 400));
    }

    const doctorId=isConflict[0]._id;
    const patientId=req.user._id;

    const doctor={
        firstName: doctor_firstName,
        lastName: doctor_lastName
    };

    const appointment=await appointmentModel.create({firstName, lastName, email, phone, aadhar, dob, gender, appointmentDate, department, doctor, hasVisited, address, doctorId, patientId});

    return res.status(200).json({
        success: true,
        message: "Appointment booked successfully",
        appointment
    });
}

export const getAllAppointments=async (req, res, next)=> {
    const appointments=await appointmentModel.find();

    return res.status(200).json({
        success: true,
        appointments
    });
}

export const updateAppointmentStatus=async (req, res, next)=> {
    const {id}=req.params;

    let appointment=await appointmentModel.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found", 400));
    }

    appointment=await appointmentModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    return res.status(200).json({
        success: true,
        message: "Appointment status updated",
        updatedAppointment: appointment
    });
}

export const deleteAppointment=async (req, res, next)=> {
    const {id}=req.params;

    let appointment=await appointmentModel.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found", 400));
    }

    await appointment.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Appointment deleted"
    });
}