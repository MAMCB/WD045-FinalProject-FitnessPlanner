const Exercise = require("../models/exercise");
const User = require("../models/user");
const cloudinary = require("../config/cloudinary");

const createExercise = async (req, res) => {
  let newExercise;
  try {
    if(req.file)
    { console.log(req.file.secure_url);
       newExercise = await Exercise.create({
      ...req.body,
      userId: req.user._id,
      image: req.file.secure_url,
    });
   

    }
    else{
       newExercise = await Exercise.create({
        ...req.body,
        userId: req.user._id,
      });
     

    }
     User.findByIdAndUpdate(
       req.user._id,
       { $push: { exercises: newExercise._id } },
       { new: true }
     ).exec();
     res.status(201).json(newExercise);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllExercises = async (req, res) => {
  try {
    
    const ownerUser = await User.findOne({ _id: req.user._id }).populate("exercises");
     if (!ownerUser) {
       return res.status(404).json({ message: "User not found" });
     }

     const allExercises = ownerUser.exercises;

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
    let updatedExercise;
  try {
    if(req.file)
    {
      updatedExercise = await Exercise.findOneAndUpdate({ _id: id }, { ...req.body, image: req.file.secure_url }, { new: true });
    }
    else{
     updatedExercise = await Exercise.findOneAndUpdate({ _id: id }, req.body, { new: true }); // { new: true } return the new updated doc in the db
    }
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
    const exercise = await Exercise.findOne({ _id: id });
    if (!exercise) {
      return res.status(404).json({ message: `Exercise with id ${id} Not Found` });
    }
    if(exercise.image.startsWith("https://res.cloudinary.com/")) {
      const public_id = exercise.image.match(/\/([^\/]+)\.gif$/)[1];
      console.log(public_id);
      await cloudinary.uploader.destroy(public_id);
    }

    const deletedExercise = await Exercise.findOneAndDelete({ _id: id });
    User.findByIdAndUpdate(
      req.user._id,
      { $pull: { exercises: id } },
      { new: true }
    ).exec();

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
