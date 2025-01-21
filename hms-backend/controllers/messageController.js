import {messageModel} from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage=async (req, res, next)=> {
    const {firstName, lastName, email, phone, message}=req.body;

    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please fill all the required details", 400));
    }

    await messageModel.create({firstName, lastName, email, phone, message});
    return res.status(200).json({
        success: true,
        message: "Message sent successfully"
    });
}

export const getAllMessages=async (req, res, next)=> {
    const messages=await messageModel.find();

    return res.status(200).json({
        success: true,
        messages
    });
}