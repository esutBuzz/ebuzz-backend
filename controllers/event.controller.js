const Event = require("../models/event.model")

exports.createEvent =  async (req, res) => {
    try {
      const event = new Event(req.body);
      await event.save();
      res.status(201).json({
        message: "New event created",
        event: event
      });
    } catch (error) {
        console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
exports.getAllEvents = async (req, res) => {
    try {
      const events = await Event.find().exec();
      res.json(events);
    } catch (error) {
        console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
exports.getEventById =  async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).exec();
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
        console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
exports.updateEventById = async (req, res) => {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec();
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
        console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
exports.deleteEventById = async (req, res) => {
    try {
      const event = await Event.findByIdAndRemove(req.params.id).exec();
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json({ message: 'Event deleted' });
    } catch (error) {
        console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };