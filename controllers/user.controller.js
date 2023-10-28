const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const generateRandomAvatar = require("../utils/avatar");
const sendMail = require("../utils/sendmail");

// create a new user controller
exports.createUser = async (req, res) => {
  try {
  const avatarUrl = generateRandomAvatar(req.body.email);

  const IsUser = await User.findOne({ email: req.body.email });
  if (IsUser) {
    return res.status(409).send({ message: "Email already exists" });
  }

  const imgTag = `<img src="${avatarUrl}" alt="${req.body.email}\'s avatar">`;

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    ...req.body,
    _id: new mongoose.Types.ObjectId(),
    avatar: generateRandomAvatar(req.body.email),
    imgTag,
    password: encryptedPassword,
  });
  await newUser.save();
  req.session.cookie.maxAge = 1 * 24 * 60 * 60; // logs out user after 1 day
  req.session.user = newUser;
  req.session.isLoggedIn = true;
  req.session.cookie.expires = false;
  
  return res
    .status(200)
    .send({ message: "User created successfully! ", user:newUser });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  };

// user login controller
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isPassword = await bcrypt.compare(password, user.password);
      if (user.email && isPassword) {
        req.session.cookie.maxAge = 1 * 24 * 60 * 60; // logs out user after 1 day
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.cookie.expires = false;
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_KEY, 
          { expiresIn: "10h" }
          );
          // Send the token in the response header
          // res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(201).send({ token, user, message: "Login Successful" });
      }
    }
    return res.status(500).send({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// user logout controller
exports.userLogout = (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).send({ error: "Logout failed" });
        }
        res.clearCookie("connect.sid"); // Clear the session cookie
        return res.status(200).send({ message: "Logout successful" });
      });
    } else {
      return res.status(200).send({ message: "Already logged out" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// fetch single user controller
exports.fetchSingleUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res
        .status(200)
        .send({ message: "User fetched successfully", user });
    }
    return res.status(401).send({ message: "User does not exist" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// fetch all users controller
exports.fetchAllUsers = async (req, res) => {
  try {
    const user = await User.find({ deleted: false });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete user controller
exports.deleteUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { deleted: true },
    { new: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
  res.status(401).json({ message: "No valid entry found for provided ID" });
};

// edit User controller
exports.editUserById = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.userId;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// fetching User By Handle
exports.fetchUserUsingHandle = (req, res) => {
  User.findOne({ username: req.params.username, deleted: false })
    .exec()
    .then((doc) => {
      console.log("From database:", doc);
      if (doc) {
        const imgTag = `<img src="${doc.avatar}" alt="${doc.username}\'s avatar">`;
        res.status(200).json({
          message: "User fetched successfully",
          fetchedUser: {
            _id: doc._id,
            imgTag: doc.imgTag,
            avatar: doc.avatar,
            username: doc.username,
            email: doc.email,
            followers: doc.followers,
            following: doc.following,
            communities: doc.communities,
          },
        });
      } else {
        res
          .status(401)
          .json({ message: "No valid entry found for provided username" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error occurred while fetching user",
        error: err,
      });
    });
};
