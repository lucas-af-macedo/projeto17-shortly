import express from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { signInValidation } from "../middlewares/signInMiddleware.js";
import {
	samePassword,
	signUpValidation,
} from "../middlewares/signUpMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUpValidation, samePassword, signUp);
authRouter.post("/signin", signInValidation, signIn);

export default authRouter;
