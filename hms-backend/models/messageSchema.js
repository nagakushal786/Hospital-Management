import mongoose from "mongoose";
import validator from "validator";

const messageSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name should be atleast 3 characters."]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name should be atleast 3 characters."]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email."]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number should contain exactly 10 numbers"],
        maxLength: [10, "Phone number should contain exactly 10 numbers"]
    },
    message: {
        type: String,
        required: true
    }
});

export const messageModel=mongoose.model("Message", messageSchema);