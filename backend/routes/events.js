const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Event = require('../models/Event');
const User = require('../models/User');


router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});


router.post('/:id/register', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    
    if (
      event.registeredUsers.some((userId) => userId.toString() === req.user.id)
    ) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    
    if (event.registeredUsers.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is at full capacity' });
    }

    event.registeredUsers.push(req.user.id);
    user.registeredEvents.push(event.id);

    await event.save();
    await user.save();

    res.json({ message: 'Successfully registered for event' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/:id/unregister', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

   
    if (
      !event.registeredUsers.some((userId) => userId.toString() === req.user.id)
    ) {
      return res.status(400).json({ message: 'Not registered for this event' });
    }

    
    event.registeredUsers = event.registeredUsers.filter(
      (userId) => userId.toString() !== req.user.id
    );

  
    user.registeredEvents = user.registeredEvents.filter(
      (eventId) => eventId.toString() !== event.id
    );

    await event.save();
    await user.save();

    res.json({ message: 'Successfully unregistered from event' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/registered/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('registeredEvents');
    res.json(user.registeredEvents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;