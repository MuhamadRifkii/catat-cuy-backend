const nodemailer = require("nodemailer");

//Generate random OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

//Kirim OTP Melalui Email
const sendOTPViaEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Catat Cuy OTP",
    text: `Halo Cuy!, Kode OTP untuk Reset Password kamu adalah ${otp}. OTP ini hanya berlaku 5 menit ya cuy!.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP");
  }
};

module.exports = { generateOTP, sendOTPViaEmail };
