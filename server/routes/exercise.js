const express = require('express');


const {createExercise, getAllExercises, getExerciseById, updateExerciseById, deleteExerciseById} = require('../controllers/exercise');

const exerciseRouter = express.Router();

exerciseRouter.post('/', createExercise);   
exerciseRouter.get('/', getAllExercises);
exerciseRouter.get('/:id', getExerciseById);
exerciseRouter.put('/:id', updateExerciseById);
exerciseRouter.delete('/:id', deleteExerciseById);

module.exports = exerciseRouter;