// for handling user-related routes


import express from 'express';
import { getCars, getUserData, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { get } from 'mongoose';

const userRouter = express.Router();

userRouter.post('/register', registerUser); 

userRouter.post('/login', loginUser);
userRouter.get('/data',protect,getUserData);
userRouter.get('/cars',getCars);

export default userRouter;