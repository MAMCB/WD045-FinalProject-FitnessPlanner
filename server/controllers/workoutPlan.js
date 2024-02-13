const WorkoutPlan = require("../models/workoutPlan");
const User = require("../models/user");

const createWorkoutPlan = async (req, res) => {
  try {
    const newWorkoutPlan = await WorkoutPlan.create({
      ...req.body,
      userId: req.user._id,
    });
    User.findByIdAndUpdate(
      req.user._id,
      { $push: { workoutPlans: newWorkoutPlan._id } },
      { new: true }
    ).exec();
    res.status(201).json(newWorkoutPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPublicWorkoutPlans = async (req, res) => {
  try {
    const publicWorkoutPlans = await WorkoutPlan.find({ visibility: true });
    res.status(200).json(publicWorkoutPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllWorkoutPlans = async (req, res) => {
  try {
    const ownerUser = await User.findOne({ _id: req.user._id }).populate(
      "workoutPlans"
    );
    if (!ownerUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const allWorkoutPlans = ownerUser.workoutPlans;
    res.status(200).json(allWorkoutPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWorkoutPlanById = async (req, res) => {
  try {
    const workoutPlanId = req.params.id;
    const workoutPlan = await WorkoutPlan.findById(workoutPlanId);
    res.status(200).json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateWorkoutPlanById = async (req, res) => {
  let updatedWorkoutPlan;
  const workoutPlanId = req.params.id;
  try {
    if(req.file)
    {
      updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(
        workoutPlanId,
        {
          ...req.body,
          image: req.file.secure_url,
        },
        { new: true }
      );
    }
    else{
      
     updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(
      workoutPlanId,
      {...req.body,
      restDuration: Number(req.body.restDuration),
    exerciseDuration: Number(req.body.exerciseDuration),
  
  },
      { new: true }
    );}
    if (!updatedWorkoutPlan) {
      res
        .status(404)
        .json({ message: `Workout Plan with id ${workoutPlanId} Not Found` });
    } else {
      res.status(200).json(updatedWorkoutPlan);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteWorkoutPlanById = async (req, res) => {
  try {
    const workoutPlanId = req.params.id;
    const deletedWorkoutPlan = await WorkoutPlan.findByIdAndDelete(
      workoutPlanId
    );
    User.findByIdAndUpdate(
      req.user._id,
      { $pull: { workoutPlans: workoutPlanId } },
      { new: true }
    ).exec();
    if (!deletedWorkoutPlan) {
      res
        .status(404)
        .json({ message: `Workout Plan with id ${workoutPlanId} Not Found` });
    } else {
      res.status(200).json(deletedWorkoutPlan);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNewVersion = async (req, res) => {
  try {
    const workoutPlanId = req.params.id;
    const workoutPlan = await WorkoutPlan.findById(workoutPlanId);

    if (!workoutPlan) {
      res
        .status(404)
        .json({ message: `Workout Plan with id ${workoutPlanId} Not Found` });
    } else {
      const workoutPlan = await WorkoutPlan.findById(workoutPlanId);
      const newVersion = await WorkoutPlan.findByIdAndUpdate(
        workoutPlanId,
        {
          $push: {
            planVersions: {
              ...req.body,
              name: `${req.body.name} -V${workoutPlan.planVersions.length}`,
              createdDay: new Date(),
            },
          },
        },
        { new: true }
      );
      res.status(201).json(newVersion);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createWorkoutPlan,
  getAllWorkoutPlans,
  getAllPublicWorkoutPlans,
  getWorkoutPlanById,
  updateWorkoutPlanById,
  deleteWorkoutPlanById,
  createNewVersion,
};
