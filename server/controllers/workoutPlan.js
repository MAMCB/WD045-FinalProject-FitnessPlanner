const WorkoutPlan = require('../models/workoutPlan');
const User = require('../models/user');

const createWorkoutPlan = async (req, res) => {
   
    try{
        const newWorkoutPlan = await WorkoutPlan.create({
          ...req.body,
          userId: req.user._id,
        });
        User.findByIdAndUpdate(req.user._id, { $push: { workoutPlans: newWorkoutPlan._id } }, { new: true }).exec();
        res.status(201).json(newWorkoutPlan);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

const getAllWorkoutPlans = async (req, res) => {
    try{
        const ownerUser = await User.findOne({ _id: req.user._id }).populate("workoutPlans");
     if (!ownerUser) {
       return res.status(404).json({ message: "User not found" });
     }

     const allWorkoutPlans = ownerUser.workoutPlans;
        res.status(200).json(allWorkoutPlans);
 }catch(error){
        res.status(500).json({ message: error.message });
    }};

const  getWorkoutPlanById = async (req, res) => {
    try{
        const workoutPlanId = req.params.id;
        const workoutPlan = await WorkoutPlan.findById(workoutPlanId);
        res.status(200).json(workoutPlan);}
        catch(error){
        res.status(500).json({ message: error.message });
}};

const updateWorkoutPlanById = async (req, res) => {
    try{
        const workoutPlanId = req.params.id;
        const updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(workoutPlanId, req.body, {new: true});
        if(!updatedWorkoutPlan){
            res.status(404).json({ message: `Workout Plan with id ${workoutPlanId} Not Found` });

    }
    else{
        res.status(200).json(updatedWorkoutPlan);
    }
}
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

const deleteWorkoutPlanById = async (req, res) => {
    try{
        const workoutPlanId = req.params.id;
        const deletedWorkoutPlan = await WorkoutPlan.findByIdAndDelete(workoutPlanId);
        User.findByIdAndUpdate(req.user._id, { $pull: { workoutPlans: workoutPlanId } }, { new: true }).exec();
        if(!deletedWorkoutPlan){
            res.status(404).json({ message: `Workout Plan with id ${workoutPlanId} Not Found` });

    }
    else{
        res.status(200).json(deletedWorkoutPlan);
    }
}
catch(error){   
    res.status(500).json({ message: error.message });
}}

module.exports = {createWorkoutPlan,getAllWorkoutPlans,getWorkoutPlanById,updateWorkoutPlanById,deleteWorkoutPlanById};

