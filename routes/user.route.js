const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validateCredentials = require("../middlewares/validateUser")
const { rateLimit } = require ('express-rate-limit')

// Enable trust proxy to handle X-Forwarded-For header
router.set('trust proxy', true);

const limiter = rateLimit({
	windowMs: 5 * 1000, // 5 seconds
	limit: 10, // Limit each IP to 10 requests per `window` (here, per 5 seconds)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

// Apply the rate limiting middleware to all requests
router.use(limiter)

// create a new user
router.post("/signup", validateCredentials, userController.createUser);

// User login and jwt validation
router.post("/login", limiter, userController.userLogin);

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
