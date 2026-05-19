const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({

  studentName: {
    type: String,
    required: true,
  },

  facultyName: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  comments: {
    type: String,
  },

});

module.exports = mongoose.model(
  "Feedback",
  feedbackSchema
);