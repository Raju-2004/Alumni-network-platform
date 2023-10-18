const mongoose = require('mongoose');
const Alumni = require('./AlumniSchema')
const NewsSchema = new mongoose.Schema({
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
  CreationDate: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumni's",
    required: true,
  },
  // Additional fields can be added here as needed.
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;
