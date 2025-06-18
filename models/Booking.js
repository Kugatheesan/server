const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  eventId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  seats: Number
});

module.exports = mongoose.model('Booking', bookingSchema);
