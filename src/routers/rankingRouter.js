import express from 'express';
import { ranking } from '../controllers/rankingController.js';

const rankingRouter = express.Router();

rankingRouter.get('/ranking', ranking);

export default rankingRouter;