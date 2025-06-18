const express = require('express');
const Admin = require('../models/Admin');
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login', async (req, res) => { 
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  console.log(admin)

  const isPasswordSame=await bcrypt.compareSync(password, admin.password)
  console.log(isPasswordSame)
  if (!admin || !isPasswordSame)
    return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
  
});

router.post ('/register',async(req,res) => {
  const{username,password} =req.body;
  const hasPassword = bcrypt.hashSync (password)
  const newUser = new Admin({
  username,
  password:hasPassword
});

newUser.save()
  .then(() => res.json({
    message:"Create Succesfully"
  }))
  .catch(err => res.json({
    message:err
  }));

})

router.get('/bookings', auth, async (req, res) => {
  const bookings = await Booking.find().populate('eventId');
  res.json(bookings);
});

router.post('/events', auth, async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

router.put('/events/:id', auth, async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
});

router.delete('/events/:id', auth, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
