const mongoose = require("mongoose");
const User = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    role: String,        
    createdAt: {type: Date, default: Date.now }
});
module.exports = mongoose.model('User', User);
