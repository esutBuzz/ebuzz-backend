const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validateCredentials = require("../middlewares/validateUser")

// create a new user
router.post("/signup", validateCredentials, userController.createUser);

// User login and jwt validation
router.post("/login", userController.userLogin);

// The logout route
router.get('/logout', userController.userLogout);

// fetch all users
router.get("/", userController.fetchAllUsers)

// fetch a user by handle
router.get("/@:username", userController.fetchUserUsingHandle);

// fetch a single user by Id
router.get("/:userId", userController.fetchSingleUserById )

// edit user 
router.put("/:userId", userController.editUserById)

// delete a user
router.delete("/:userId", userController.deleteUser)

module.exports = router;
