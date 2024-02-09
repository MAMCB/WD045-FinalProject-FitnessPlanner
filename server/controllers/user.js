const User = require("../models/user");
const multer = require('multer');
const path = require('path');
const axios = require("axios");
const cloudinary = require("../config/cloudinary");

const createUser = async (req, res) => {
  try {
    console.log('MULTER FILE??',req.file.path);
    const newUser = await User.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(201).json(allUsers);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.find({ _id: id }).populate('exercises workoutPlans');
    if (user.length === 0) {
      res.status(404).json({ message: `User with id ${id} Not Found` });
    } else {
      res.json(user[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  let updatedUser;
  let currentUrl;

 
  try {
    if(req.file)
    {

      

      axios.get(`http://localhost:8000/api/user/${id}`)
      .then(res =>  { console.log('****+++++',res.data.profilePic);
    currentUrl = res.data.profilePic 
    console.log('currentUrl-----',currentUrl)
    deletePicture(currentUrl,id,req);

  })
      .catch(e=>console.error(e)) 
    
      console.log(req.file.path);
      updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { ...req.body, profilePic: req.file.path },
        {
          new: true,
        }
      ); // { new: true } return the new updated doc in the db
    
   
    }else{
      console.log('no file');
      updatedUser = await User.findOneAndUpdate(
        { _id: id },
       req.body,
        {
          new: true,
        }
      );
    }
   
  
    if (Object.keys(updatedUser).length === 0) {
    
      res.status(404).json({ message: `User with id ${id} Not Found` });
    } else {
      //res.json(User[0]);
        console.log('update user', updatedUser)
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePicture = async(currentUrl,id,req)=>{

  updatedUser = await User.findOneAndUpdate({ _id: id },  {...req.body, profilePic:req.file.path},{
    new: true,
  }); // { new: true } return the new updated doc in the db

  
  if(updatedUser.profilePic.startsWith("https://res.cloudinary.com/")) {
    const public_id = currentUrl.match(/\.(jpg|jpeg|png|gif)$/)[1]
    console.log('',public_id);
    await cloudinary.uploader.destroy(public_id);
}



}


const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ _id: id }, req.body, {
      new: true,
    }); // { new: true } return the new updated doc in the db
    if (User.length === 0) {
      res.status(404).json({ message: `User with id ${id} Not Found` });
    } else {
      res.json(deletedUser[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
