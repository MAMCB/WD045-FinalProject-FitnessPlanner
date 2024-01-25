const Exercise = require("../models/exercise");

const createExercise = async (req, res) => {
  try {
    const newExercise = await Exercise.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllExercises = async (req, res) => {
  try {
    const allExercises = await Exercise.find();
    res.status(201).json(allExercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExerciseById = async (req, res) => {
    const { id } = req.params;
  try {
    const exercises = await Exercise.find({ _id: id }) //returns array
    if (exercises.length === 0) {
      res.status(404).json({ message: `Exercise with id ${id} Not Found` });
    } else {
      res.json(exercises[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExerciseById = async (req, res) => {
    const { id } = req.params;
  try {
    const updatedExercise = await Exercise.findOneAndUpdate({ _id: id }, req.body, { new: true }); // { new: true } return the new updated doc in the db

    if (!updatedExercise) {
      res.status(404).json({ message: `Exercise with id ${id} Not Found` });
    } else {
      res.json(updatedExercise);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExerciseById = async (req, res) => {
    const { id } = req.params;
  try {
    const deletedExercise = await Exercise.findOneAndDelete({ _id: id });

    if (!deletedExercise) {
      res.status(404).json({ message: `Exercise with id ${id} Not Found` });
    } else {
      res.json(deletedExercise);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExerciseById,
  deleteExerciseById,
};
