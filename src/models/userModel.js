import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    profileImage: {
        type: String,
        default: "",
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

    address: [
    {
    label: {
        type: String,
        default: "Home" 
    },
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String,
    }
]
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;