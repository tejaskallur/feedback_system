const Feedback = require('../models/Feedback');

// Controller to handle feedback submission
exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting feedback', error: err.message });
  }
};

// Controller to fetch all feedbacks for admin dashboard
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch feedbacks', error: err.message });
  }
};