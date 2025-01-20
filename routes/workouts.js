const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
const {
  createWorkOut,
  getWorkouts,
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

router.use(requireAuth);
// GET
router.get("/", getWorkouts);

// GET single workout

router.get("/:id", getWorkoutById);
// POST
router.post("/", createWorkOut);

// DELETE
router.delete("/:id", deleteWorkout);

// update

router.patch("/:id", updateWorkout);

module.exports = router;
