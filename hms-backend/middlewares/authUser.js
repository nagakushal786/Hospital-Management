import {catchAsyncErrors} from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import {userModel} from "../models/userSchema.js";

export const isAdminAuthenticated=catchAsyncErrors(async (req, res, next)=> {
    const token=req.cookies.adminToken;

    if(!token){
        return next(new ErrorHandler("Admin not authenticated", 400));
    }

    const decodedToken=jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user=await userModel.findById(decodedToken.id);

    if(req.user.role!=="Admin"){
        return next(new ErrorHandler(`${req.user.role} is not authorized for this page`, 403));
    }
    next();
});

export const isPatientAuthenticated=catchAsyncErrors(async (req, res, next)=> {
    const token=req.cookies.patientToken;

    if(!token){
        return next(new ErrorHandler("Patient not authenticated", 400));
    }

    const decodedToken=jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user=await userModel.findById(decodedToken.id);

    if(req.user.role!=="Patient"){
        return next(new ErrorHandler(`${req.user.role} is not authorized for this page`, 403));
    }
    next();
});