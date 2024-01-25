const express = require('express');
const authenticate = require('../middlewares/auth');
const authRouter = express.Router();
const { register, login, logout, getLoggedInUser } = require('../controllers/authentication');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/user', authenticate, getLoggedInUser);


module.exports = authRouter;