import express from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { existEmail, samePassword, signUpValidation } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/signup', signUpValidation, samePassword, existEmail, signUp);
authRouter.post('/signin', signIn);

export default authRouter;