import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

const messageRouter=express.Router();

messageRouter.post("/send", catchAsyncErrors(sendMessage));

export default messageRouter;