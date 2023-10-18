const mongoose = require('mongoose');
const Alumni = require('./AlumniSchema')
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Image: {
    type: String, 
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  isOnline: {
    type: Boolean,
    required: true,
  },
  CreationDate: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: String,
    required: function () {
      // Location is required only if the event is not online
      return !this.isOnline;
    },
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumni's",
    required: true,
  },
  // Additional fields can be added here as needed.
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
