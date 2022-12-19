import express from 'express';
import { userData } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/users/me', userData);

export default userRouter;