const validateWorkoutPlan = (req, res, next) => {
  const {
    name,
    goal,
    restDuration,
    exerciseDuration,
    exercises
  } = req.body;

  if (
    !name ||
    !goal ||
    exercises.length === 0 ||
    restDuration <= 0 ||
    exerciseDuration <= 0
  ) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  next();
};
module.exports = validateWorkoutPlan;