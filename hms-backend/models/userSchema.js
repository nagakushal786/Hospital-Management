import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [8, "Password should be atleast 8 characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    },
    timings: {
        type: [
            {
                day: {
                    type: String,
                    required: true,
                    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                },
                from: {
                    type: String,
                    required: true,
                    validate: {
                        validator: function(value){
                            return /^\d{2}:\d{2}$/.test(value);
                        },
                        message: "Time should be in HH:mm format"
                    }
                },
                to: {
                    type: String,
                    required: true,
                    validate: {
                        validator: function(value){
                            return /^\d{2}:\d{2}$/.test(value);
                        },
                        message: "Time should be in HH:mm format"
                    }
                }
            }
        ],
        required: true
    }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password=await bcryptjs.hash(this.password, 10);
});

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password);
}

userSchema.methods.generateToken=function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

export const userModel=mongoose.model("User", userSchema);