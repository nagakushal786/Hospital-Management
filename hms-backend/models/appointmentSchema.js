import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name should be atleast 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name should be atleast 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number should contain exactly 10 numbers"],
        maxLength: [10, "Phone number should contain exactly 10 numbers"]
    },
    aadhar: {
        type: String,
        required: true,
        minLength: [12, "Aadhar number should contain exactly 12 numbers"],
        maxLength: [12, "Aadhar number should contain exactly 12 numbers"]
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    hasVisited: {
        type: Boolean,
        default: false
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
});

export const appointmentModel=mongoose.model("Appointment", appointmentSchema);