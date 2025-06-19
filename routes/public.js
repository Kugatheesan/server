const express = require('express');
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const router = express.Router();

router.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post('/book', async (req, res) => {
  const { eventId, name, email, seats } = req.body;
  const event = await Event.findById(eventId);
  if (!event || event.availableSeats < seats) return res.status(400).json({ message: 'Not enough seats' });

  event.availableSeats -= seats;
  await event.save();

  const booking = new Booking({ eventId, name, email, seats });
  await booking.save();

  res.json({ message: 'Booking successfull', booking });
});
router.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
