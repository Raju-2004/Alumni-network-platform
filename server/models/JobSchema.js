const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  companyImage: {
    type: String, // You can store a URL to the company's logo image
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumni's",
    required: true,
  },
  CreationDate: {
    type: Date,
    default: Date.now(),
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
