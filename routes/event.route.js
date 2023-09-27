const express = require("express")
const router = express.Router()
const eventController = require("../controllers/event.controller")
const uploadMiddleware = require("../middlewares/uploadMiddleware")


router.post('/users/:userId/events', uploadMiddleware, eventController.createEvent)

router.get('/users/:userId/events', eventController.getAllEvents)

router.get('/users/:userId/events/:eventId', eventController.getEventById)

router.put('/users/:userId/events/:eventId', eventController.updateEventById)

router.delete('/users/:userId/events/:eventId', eventController.deleteEventById)

module.exports = router;