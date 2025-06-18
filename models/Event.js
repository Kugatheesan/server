const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  venue: String,
  totalSeats: Number,
  availableSeats: Number,
  imageUrl:String,
   price:Number
});

module.exports = mongoose.model('Event', eventSchema);
