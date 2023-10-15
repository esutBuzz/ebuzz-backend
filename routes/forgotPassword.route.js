const express = require('express');
const router = express.Router();
const forgotPasswordController = require("../controllers/forgotPassword.controller");

// ROUTE TO INITIATE FORGOT PASSWORD
router.post("/forgotPassword", forgotPasswordController.forgotPassword);

// ROUTE TO INPUT RECEIVED OTP CODE FOR VERIFICATION
router.post("/verifyOtp", forgotPasswordController.verifyOtp)

// ROUTE TO RESET PASSWORD AFTER OTP CODE HAS BEEN VERIFIED
router.put("/resetPassword", forgotPasswordController.resetPassword)

module.exports = router;