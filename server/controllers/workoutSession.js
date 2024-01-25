const WorkoutSession = require('../models/workoutSession');

const createWorkoutSession = async (req, res) => {
    try {
        const newWorkoutSession = await WorkoutSession.create({
          ...req.body,
          userId: req.user._id,
        });
        res.status(201).json(newWorkoutSession);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

};
const getAllWorkoutSessions = async (req, res) => {
    try {
        const allWorkoutSessions = await WorkoutSession.find({userId: req.user._id});
        res.status(201).json(allWorkoutSessions);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};
const getWorkoutSessionById = async (req, res) => {
    const { id } = req.params;
    try {
      const workoutSessionById = await WorkoutSession.find({ _id: id }) //returns array
      if (workoutSessionById.length === 0) {
        res.status(404).json({ message: `Workout session with id ${id} Not Found` });
      } else {
        res.json(workoutSessionById[0]);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

};
const updateWorkoutSessionById = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedWorkoutSessionById = await WorkoutSession.findOneAndUpdate({ _id: id }, req.body, { new: true }); // { new: true } return the new updated doc in the db
  
      if (!updatedWorkoutSessionById) {
        res.status(404).json({ message: `Workout session with id ${id} Not Found` });
      } else {
        res.json(updatedWorkoutSessionById);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

};
const deleteWorkoutSessionById = async (req, res) => {
    const { id } = req.params;
    try {
const WorkoutSession = require('../models/workoutSession');
      const deletedWorkoutSessionById = await WorkoutSession.findOneAndDelete({ _id: id });
  
      if (!deletedWorkoutSessionById) {
        res.status(404).json({ message: `Workout session with id ${id} Not Found` });
      } else {
        res.json(deletedWorkoutSessionById);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }


};

module.exports = {createWorkoutSession,getAllWorkoutSessions,getWorkoutSessionById,updateWorkoutSessionById,deleteWorkoutSessionById};