const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedbacks } = require('../controllers/feedbackController');

router.post('/submit', submitFeedback);
router.get('/all', getAllFeedbacks); // 🆕 Fetch all feedbacks

module.exports = router;
