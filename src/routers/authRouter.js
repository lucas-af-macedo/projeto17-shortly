import express from "express";
import { signIn, signUp } from "../controllers/authController.js";
import {
	passwordValidation,
	signInEmailValidation,
	signInValidation,
} from "../middlewares/signInMiddleware.js";
import {
	existEmail,
	samePassword,
	signUpValidation,
} from "../middlewares/signUpMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUpValidation, samePassword, existEmail, signUp);
authRouter.post(
	"/signin",
	signInValidation,
	signInEmailValidation,
	passwordValidation,
	signIn
);

export default authRouter;
