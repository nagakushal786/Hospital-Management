import express from "express";
import { getAllMessages, sendMessage } from "../controllers/messageController.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { isAdminAuthenticated } from "../middlewares/authUser.js";

const messageRouter=express.Router();

messageRouter.post("/send", catchAsyncErrors(sendMessage));
messageRouter.get("/messages", isAdminAuthenticated, catchAsyncErrors(getAllMessages));

export default messageRouter;