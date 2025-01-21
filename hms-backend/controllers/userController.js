import ErrorHandler from "../middlewares/errorMiddleware.js";
import { userModel } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister=async (req, res, next)=> {
    const {firstName, lastName, email, phone, aadhar, dob, gender, password, role}=req.body;

    if(!firstName || !lastName || !email || !phone || !aadhar || !dob || !gender || !password || !role){
        return next(new ErrorHandler("Please fill all the required details", 400));
    }

    let user=await userModel.findOne({email});
    if(user){
        return next(new ErrorHandler("User already exists", 400));
    }

    user=await userModel.create({firstName, lastName, email, phone, aadhar, dob, gender, password, role});

    generateToken(user, `${user.role} registered successfully`, 200, res);
}

export const patientLogin=async (req, res, next)=> {
    const {email, password, role}=req.body;

    if(!email || !password || !role){
        return next(new ErrorHandler("Please fill all the required details", 400));
    }

    const user=await userModel.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid credentials or User not registered", 400));
    }

    const isPasswordCorrect=await user.comparePassword(password);
    if(!isPasswordCorrect){
        return next(new ErrorHandler("Invalid password", 400));
    }

    if(role!==user.role){
        return next(new ErrorHandler("User with this role not found", 400));
    }

    generateToken(user, `${user.role} logged in successfully`, 200, res);
}

export const adminRegister=async (req, res, next)=> {
    const {firstName, lastName, email, phone, aadhar, dob, gender, password}=req.body;

    if(!firstName || !lastName || !email || !phone || !aadhar || !dob || !gender || !password){
        return next(new ErrorHandler("Please fill all the required details", 400));
    }

    const isRegistered=await userModel.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists`, 400));
    }

    const admin=await userModel.create({firstName, lastName, email, phone, aadhar, dob, gender, password, role: "Admin"});

    return res.status(200).json({
        success: true,
        message: "Admin registered successfully",
        data: admin
    });
}

export const getAllDoctors=async (req, res, next)=> {
    const doctors=await userModel.find({role: "Doctor"});

    return res.status(200).json({
        success: true,
        doctors
    });
}

export const getUserDetails=async (req, res, next)=> {
    const user=req.user;

    return res.status(200).json({
        success: true,
        user
    });
}

export const getAllAdmins=async (req, res, next)=> {
    const admins=await userModel.find({role: "Admin"});

    if(!admins || admins.length==0){
        return next(new ErrorHandler("No admins registered", 400));
    }

    return res.status(200).json({
        success: true,
        admins
    });
}

export const getAllPatients=async (req, res, next)=> {
    const patients=await userModel.find({role: "Patient"});

    if(!patients || patients.length==0){
        return next(new ErrorHandler("No patients registered", 400));
    }

    return res.status(200).json({
        success: true,
        patients
    });
}

export const adminLogout=async (req, res, next)=> {
    return res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin logged out successfully"
    });
}

export const patientLogout=async (req, res, next)=> {
    return res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient logged out successfully"
    });
}

export const addNewDoctor=async (req, res, next)=> {
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor Image required", 400));
    }

    const {docAvatar}=req.files;
    const allowedFormats=["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format not supported", 400));
    }

    const {firstName, lastName, email, phone, aadhar, dob, gender, password, doctorDepartment, timings, dayDoctorAvailable}=req.body;
    if(!firstName || !lastName || !email || !phone || !aadhar || !dob || !gender || !password || !doctorDepartment || !timings || !dayDoctorAvailable){
        return next(new ErrorHandler("Please fill all the required details", 400));
    }

    const isRegistered=await userModel.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("Doctor with this email already exists", 400));
    }

    const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary error:", cloudinaryResponse.error || "Unknown cloudinary error");
    }  

    const doctor=await userModel.create({firstName, lastName, email, phone, aadhar, dob, gender, password, doctorDepartment, timings, dayDoctorAvailable, role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });

    return res.status(200).json({
        success: true,
        message: "New Doctor registered",
        doctor
    });
}