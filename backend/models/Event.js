const mongoose = require('mongoose');

const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
    },
    capacity: {
      type: Number,
      required: [true, 'Event capacity is required'],
    },
    imageUrl: {
      type: String,
      default: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
    },
    registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', EventSchema);
