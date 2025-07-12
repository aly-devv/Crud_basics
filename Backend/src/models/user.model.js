import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({

    name: {
        type : String,
        required: true,
        trim: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{11}$/, "Phone number must be exactly 11 digits"],
        unique: true

    }   
})
const User = mongoose.model("User", userSchema);
export default User;