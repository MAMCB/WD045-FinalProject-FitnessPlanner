const express = require('express');
const cloudinary = require("../config/cloudinary");
const {cloudinaryUpload} = require("../middlewares/cloudinaryUpload")
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/user');

const userRouter = express.Router();
const upload = require('../config/multer')



userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id',upload.single('profilePic'), updateUserById);
userRouter.delete('/:id', deleteUserById);

module.exports = userRouter;