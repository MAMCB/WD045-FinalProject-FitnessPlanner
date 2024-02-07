const express = require('express');
const { authenticate } = require('../middlewares/auth');
const validateWorkoutPlan = require('../middlewares/validateWorkoutPlan');
const { createWorkoutPlan, getAllWorkoutPlans, getWorkoutPlanById, updateWorkoutPlanById, deleteWorkoutPlanById, createNewVersion } = require('../controllers/workoutPlan');
const workoutPlanRouter = express.Router();

workoutPlanRouter.post('/',authenticate, validateWorkoutPlan, createWorkoutPlan);
workoutPlanRouter.get("/", authenticate, getAllWorkoutPlans);
workoutPlanRouter.get("/:id", authenticate, getWorkoutPlanById);
workoutPlanRouter.put("/:id", authenticate, updateWorkoutPlanById);
workoutPlanRouter.put("/:id/version", authenticate, createNewVersion);
workoutPlanRouter.delete("/:id", authenticate, deleteWorkoutPlanById);

module.exports = workoutPlanRouter;