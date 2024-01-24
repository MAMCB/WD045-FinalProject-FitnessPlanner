const express = require('express');

const exerciseRouter = express.Router();

exerciseRouter.post('/', createExercise);   
exerciseRouter.get('/', getAllExercises);
exerciseRouter.get('/:id', getExerciseById);
exerciseRouter.put('/:id', updateExerciseById);
exerciseRouter.delete('/:id', deleteExerciseById);

module.exports = exerciseRouter;