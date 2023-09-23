const express = require("express")
const router = express.Router()
const eventController = require("../controllers/event.controller")

router.use()

router.post('/events', eventController.createEvent)
router.get('/events', eventController.getAllEvents)
router.get('/events/:id', eventController.getEventById)
router.put('/events/:id', eventController.updateEventById)
router.delete('/events/:id', eventController.deleteEventById)

module.exports = router;