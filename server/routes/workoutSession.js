const express = require('express');
const { authenticate } = require("../middlewares/auth");
const {createWorkoutSession, getAllWorkoutSessions, getWorkoutSessionById, updateWorkoutSessionById, deleteWorkoutSessionById} = require('../controllers/workoutSession');
const workoutSessionRouter = express.Router();

workoutSessionRouter.post('/',authenticate, createWorkoutSession);
workoutSessionRouter.get('/',authenticate, getAllWorkoutSessions);
workoutSessionRouter.get('/:id',authenticate, getWorkoutSessionById);
workoutSessionRouter.put('/:id',authenticate, updateWorkoutSessionById);
workoutSessionRouter.delete('/:id',authenticate, deleteWorkoutSessionById);

module.exports = workoutSessionRouter;