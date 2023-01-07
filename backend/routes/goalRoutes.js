const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// to protect routes
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoals);

router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
