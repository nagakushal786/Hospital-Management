import express, { urlencoded } from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import connectDB from "./database/dbConnect.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app=express();
config({path: "./config/config.env"});

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({
    extended: true,
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use("/hms/message", messageRouter);
app.use("/hms/user", userRouter);
app.use("/hms/appointment", appointmentRouter);

connectDB();

app.use(errorMiddleware);
export default app;