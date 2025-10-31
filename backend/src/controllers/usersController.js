const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const readSecret = require("../utils/readSecrets");
const sendEmail = require("../utils/sendEmail")

exports.login = async (req, res) => {
  console.log("POST /login called!")
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email."});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      readSecret("jwt_secret", process.env.JWT_DEV),
      // { expiresIn: "1h" }
      { expiresIn: "15s" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { email: user.email, role: user.role },
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error'});
  }
};


exports.logout = async (req, res) => {
  console.log("POST /logout called!")
  try {
    res.clearCookie("token", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: "strict",
  });
    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

exports.me = async (req, res) => {
  console.log("GET /me called!");
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, readSecret("jwt_secret", process.env.JWT_DEV));
    
    const user = await User.findById(decoded.id).select("email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.register = async (req, res) => {
  console.log("POST /register called!");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: "viewer", // Will need a backoffice to be changed later on
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, email: newUser.email },
      readSecret("jwt_secret", process.env.JWT_DEV),
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000, 
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { email: newUser.email, role: newUser.role },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.forgotPassword = async (req, res) => {
  console.log("POST /forgot-password called!");
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const resetToken = jwt.sign(
    { id: user._id },
    readSecret("jwt_secret", process.env.JWT_DEV),
    { expiresIn: "15m" }
  );
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min
  await user.save();

  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`; //TODO Change depending on prod
  await sendEmail(user.email, "Reset password", `Click here: ${resetUrl}`);

  res.json({ message: "Reset email sent" });
};

exports.resetPassword = async (req, res) => {
  console.log("POST /reset-password called!");
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ message: "Invalid request" });

  try {
    const decoded = jwt.verify(token, readSecret("jwt_secret", process.env.JWT_DEV));

    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Token invalid or expired" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Token invalid or expired" });
  }
};