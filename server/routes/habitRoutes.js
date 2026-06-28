import express from "express";
import Habit from "../models/habit.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all habits for logged in user
router.get("/", protect, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a habit
router.post("/", protect, async (req, res) => {
  const { name, description } = req.body;
  try {
    const habit = new Habit({
      user: req.user._id,
      name,
      description,
      history: [],
    });
    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle complete status for a specific date (YYYY-MM-DD)
router.post("/:id/toggle", protect, async (req, res) => {
  const { date } = req.body; // Expects 'YYYY-MM-DD'
  try {
    const habit = await Habit.findOne({
      _id: req.id || req.params.id,
      user: req.user._id,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const index = habit.history.indexOf(date);
    if (index > -1) {
      habit.history.splice(index, 1); // Uncheck
    } else {
      habit.history.push(date); // Check
    }

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete habit
router.delete("/:id", protect, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json({ message: "Habit removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
