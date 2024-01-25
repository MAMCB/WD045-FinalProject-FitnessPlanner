const express = require('express');
const {createWorkoutSession, getAllWorkoutSessions, getWorkoutSessionById, updateWorkoutSessionById, deleteWorkoutSessionById} = require('../controllers/workoutSession');
const workoutSessionRouter = express.Router();

workoutSessionRouter.post('/', createWorkoutSession);
workoutSessionRouter.get('/', getAllWorkoutSessions);
workoutSessionRouter.get('/:id', getWorkoutSessionById);
workoutSessionRouter.put('/:id', updateWorkoutSessionById);
workoutSessionRouter.delete('/:id', deleteWorkoutSessionById);

module.exports = workoutSessionRouter;