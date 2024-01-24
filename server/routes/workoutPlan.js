const express = require('express');
const workoutPlanRouter = express.Router();

workoutPlanRouter.post('/', createWorkoutPlan);
workoutPlanRouter.get('/', getAllWorkoutPlans);
workoutPlanRouter.get('/:id', getWorkoutPlanById);
workoutPlanRouter.put('/:id', updateWorkoutPlanById);
workoutPlanRouter.delete('/:id', deleteWorkoutPlanById);

module.exports = workoutPlanRouter;