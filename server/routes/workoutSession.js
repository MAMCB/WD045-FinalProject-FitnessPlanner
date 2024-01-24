const express = require('express');
const workoutSessionRouter = express.Router();

workoutSessionRouter.post('/', createWorkoutSession);
workoutSessionRouter.get('/', getAllWorkoutSessions);
workoutSessionRouter.get('/:id', getWorkoutSessionById);
workoutSessionRouter.put('/:id', updateWorkoutSessionById);
workoutSessionRouter.delete('/:id', deleteWorkoutSessionById);

module.exports = workoutSessionRouter;