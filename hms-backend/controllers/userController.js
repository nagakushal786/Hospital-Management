import ErrorHandler from "../middlewares/errorMiddleware.js";
import { userModel } from "../models/userSchema.js";

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

    return res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: user
    });
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

    return res.status(200).json({
        success: true,
        message: "User logged in successfully"
    });
}