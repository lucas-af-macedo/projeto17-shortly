import express from 'express';
import { deleteUrl, getOneUrl, openUrl, postUrl } from '../controllers/urlController.js';

const urlRouter = express.Router();

urlRouter.post('/urls/shorten', postUrl);
urlRouter.get('/urls/:id', getOneUrl);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.delete('/urls/:id', deleteUrl);

export default urlRouter;