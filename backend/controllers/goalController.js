const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const userModel = require("../models/userModel");
const User = require("../models/userModel");

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  // get all the goals
  const goals = await Goal.find({ user: req.user.id });
  // status code 200 means OK
  res.status(200).json(goals);
});

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
  // simple validation
  if (!req.body.text) {
    // status code 400 means bad request from client
    res.status(400);
    throw new Error("Please add a text field");
  }

  // create a new goal
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  // find the goal by id
  const goal = await Goal.findById(req.params.id);
  // simple validation
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("Not found");
  }

  // make sure the user updates his own goal only
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  // find and update the need goal
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  // find the goal by id
  const goal = await Goal.findById(req.params.id);

  // simple validation
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("Not found");
  }

  // make sure the user updates his own goal only
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  // delete the record
  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoals, updateGoal, deleteGoal };
