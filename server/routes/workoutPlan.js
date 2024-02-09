const express = require('express');
const { authenticate } = require('../middlewares/auth');
const validateWorkoutPlan = require('../middlewares/validateWorkoutPlan');
const { upload, uploadFileIfPresent } = require("../config/multer");
const { cloudinaryUpload } = require("../middlewares/cloudinaryUpload");
const { createWorkoutPlan, getAllWorkoutPlans,getAllPublicWorkoutPlans, getWorkoutPlanById, updateWorkoutPlanById, deleteWorkoutPlanById, createNewVersion } = require('../controllers/workoutPlan');
const workoutPlanRouter = express.Router();

workoutPlanRouter.post('/',authenticate, validateWorkoutPlan, createWorkoutPlan);
workoutPlanRouter.get("/", authenticate, getAllWorkoutPlans);
workoutPlanRouter.get("/public", authenticate, getAllPublicWorkoutPlans);
workoutPlanRouter.get("/:id", authenticate, getWorkoutPlanById);
workoutPlanRouter.put("/:id", authenticate,upload.single("image"),cloudinaryUpload, updateWorkoutPlanById);
workoutPlanRouter.put("/:id/version", authenticate, createNewVersion);
workoutPlanRouter.delete("/:id", authenticate, deleteWorkoutPlanById);

module.exports = workoutPlanRouter;