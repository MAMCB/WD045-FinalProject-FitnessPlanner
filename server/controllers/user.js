const User = require("../models/user");

const createUser = async (req, res) => {
  try {
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
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }); // { new: true } return the new updated doc in the db
    if (User.length === 0) {
      res.status(404).json({ message: `User with id ${id} Not Found` });
    } else {
      res.json(User[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
