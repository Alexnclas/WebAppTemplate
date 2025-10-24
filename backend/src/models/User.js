const mongoose = require("mongoose");
const User = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "viewer" },    
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    createdAt: {type: Date, default: Date.now }
});
module.exports = mongoose.model('User', User);
