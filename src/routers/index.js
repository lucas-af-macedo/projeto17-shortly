import express from "express";
import authRouter from "./authRouter.js";
import rankingRouter from "./rankingRouter.js";
import urlRouter from "./urlRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use(authRouter);
router.use(userRouter);
router.use(rankingRouter);
router.use(urlRouter);

export default router;
