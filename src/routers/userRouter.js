import express from "express";
import { userData } from "../controllers/userController.js";
import { tokenValidation } from "../middlewares/tokenMidleware.js";

const userRouter = express.Router();

userRouter.get("/users/me", tokenValidation, userData);

export default userRouter;
