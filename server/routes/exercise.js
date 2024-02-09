const express = require('express');
const { authenticate } = require("../middlewares/auth");
const apiImageHandler = require('../middlewares/apiImageHandler');
const {upload,uploadFileIfPresent} = require('../config/multer');
const { cloudinaryUpload } = require("../middlewares/cloudinaryUpload");
const {createExercise, getAllExercises, getExerciseById, updateExerciseById, deleteExerciseById} = require('../controllers/exercise');

const exerciseRouter = express.Router();

exerciseRouter.post('/', authenticate,apiImageHandler, createExercise);   
exerciseRouter.get("/", authenticate, getAllExercises);
exerciseRouter.get("/:id", authenticate, getExerciseById);
exerciseRouter.put(
  "/:id",
  authenticate,
  upload.single("image"),
  cloudinaryUpload,
  updateExerciseById
);
exerciseRouter.delete("/:id", authenticate, deleteExerciseById);

module.exports = exerciseRouter;