const express = require("express")
const router = express.Router()
const eventController = require("../controllers/event.controller")
const uploadMiddleware = require("../middlewares/uploadMiddleware")
const isAuth = require("../middlewares/check-auth")


router.post('/users/:userId/events', isAuth, uploadMiddleware, eventController.createEvent)

router.get('/users/:userId/events', isAuth,  eventController.getAllEvents)

router.get('/users/:userId/events/:eventId', isAuth, eventController.getEventById)

router.put('/users/:userId/events/:eventId', isAuth, eventController.updateEventById)

router.delete('/users/:userId/events/:eventId', isAuth, eventController.deleteEventById)

module.exports = router;