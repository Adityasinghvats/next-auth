import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email:{
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    role:{
        type:Boolean,
        default: false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

//as we using edge we need to make sure we have a model 
// available if not create it before returning the value
const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;