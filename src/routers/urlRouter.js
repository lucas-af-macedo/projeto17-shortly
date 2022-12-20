import express from 'express';
import { deleteUrl, getOneUrl, openUrl, postUrl } from '../controllers/urlController.js';
import { tokenValidation } from '../middlewares/tokenMidleware.js';
import { urlOwner, urlValidation } from '../middlewares/urlMiddleware.js';

const urlRouter = express.Router();

urlRouter.post('/urls/shorten', urlValidation, tokenValidation, postUrl);
urlRouter.get('/urls/:id', getOneUrl);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.delete('/urls/:id', tokenValidation, urlOwner, deleteUrl);

export default urlRouter;