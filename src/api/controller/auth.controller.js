const db = require("../../models");
const User = db.users;

const passwordUtil = require("../../utils/password.util");
const tokenUtils = require("../../utils/token.util");
const otpUtil = require("../../utils/otp.util");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(400).json({ error: true, message: "Name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ where: { email: email } });

  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "Email already exists" });
  }

  const user = new User({
    name,
    email,
    password: await passwordUtil.encrypt(req.body.password),
  });

  await user.save();

  const token = await tokenUtils.encode(user);

  return res.status(201).json({
    success: true,
    user,
    token,
    message: "User registered successfully",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const checkUser = await passwordUtil.compare(password, user.password);
  if (!checkUser) {
    return res.status(401).json({ message: "Password Incorrect" });
  }

  const token = await tokenUtils.encode(user);
  return res.json({
    error: false,
    message: "Login Successful",
    email: email,
    token: token,
  });
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: true, message: "User not found" });
  }

  const OTP = otpUtil.generateOTP();
  const otpExpire = new Date();
  otpExpire.setMinutes(otpExpire.getMinutes() + 10); // 10 Minutes

  user.otp = OTP;
  user.otpExpire = otpExpire;
  await user.save();

  try {
    await otpUtil.sendOTPViaEmail(email, OTP);
    return res.status(200).json({
      error: false,
      message: "Password reset OTP sent successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Failed to send OTP for password reset.",
    });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      error: true,
      message: "Email, OTP, and new password are required.",
    });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: true, message: "User not found" });
  }

  if (user.otp !== otp || new Date() > user.otpExpire) {
    return res.status(400).json({
      error: true,
      message: "Invalid or expired OTP.",
    });
  }

  user.password = await passwordUtil.encrypt(req.body.newPassword);
  user.otp = null;
  user.otpExpire = null;
  await user.save();

  return res.status(200).json({
    error: false,
    message: "Password has been reset successfully.",
  });
};

const getUserInfo = async (req, res) => {
  const { id } = req.user;

  const isUser = await User.findOne({ where: { id } });

  if (!isUser) {
    return res.status(401).json({ message: "User not found" });
  }

  return res.json({
    error: false,
    user: {
      name: isUser.name,
      email: isUser.email,
      id: isUser.id,
      createdAt: isUser.createdAt,
    },
    message: "User information retrieved successfully",
  });
};

module.exports = {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  getUserInfo,
};
