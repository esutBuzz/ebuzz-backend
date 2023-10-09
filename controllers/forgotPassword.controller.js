const User = require("../models/user.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Create a transporter for sending email (you can configure it based on your email provider)
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., "Gmail", "Outlook", or use your SMTP settings
  auth: {
    user: "kingsleycj2020@gmail.com",
    pass: "Mathematics1",
  },
});

// Function to generate a random 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a 4-digit OTP code
    const otpCode = generateOTP();

    // Compose the password reset email message
    const mailOptions = {
      from: "kingsleycj2020@gmail.com",
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otpCode}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
