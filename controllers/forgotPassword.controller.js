const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendmail");

// Function to generate a random 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email, username } = req.body;
    console.log(req.body);
    // Find the user by email
    const user = await User.findOne({ email });
    if (user) {
      if (user.username == username) {
        const otpCode = generateOTP();
        const token = await jwt.sign({ otpCode }, process.env.JWT_KEY, {
          expiresIn: "2m",
        });
        req.session.otpCode = token;
        req.session.user = user;
        sendMail(email, `Your OTP Code is ${otpCode}, it expires in 2 mins`);
        return res.status(200).send({ message: "OTP code has been sent" });
      }
      return res.status(500).send({ error: "invalid username" });
    }
    return res.status(500).send({ error: "invalid email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.verifyOtp = async (req, res) => {
  try {
    const { otpCode } = req.body;
    const verifyToken = await jwt.verify(
      req.session.otpCode,
      process.env.JWT_KEY
    );
    if (otpCode == verifyToken.otpCode) {
      return res
        .status(200)
        .send({ redirect: true, message: "optCode verified" });
    }
    return res
      .status(400)
      .send({ redirect: false, message: "wrong or expired OTP" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      return res.send({ error: "Passwords do not match" });
    }
    const userId = req.session.user._id;
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const isUpdated = await User.findByIdAndUpdate(userId, {
      password: encryptedPassword,
    });
    if (isUpdated) {
      return res.status(200).send({ message: "Password updated successfully" });
    } else {
      return res.status(500).send({ error: "Failed to update password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
