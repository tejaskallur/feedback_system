const express = require("express");

const router = express.Router();

const {
  submitFeedback,
  getAllFeedbacks,
} = require("../controllers/feedbackController");

router.post("/", submitFeedback);

router.get("/", getAllFeedbacks);

module.exports = router;