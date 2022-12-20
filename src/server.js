import express from 'express';
import cors from 'cors';
import { stripHtml } from 'string-strip-html';
import router from './routers/index.js';

export const cleanStringData = (string) =>
    typeof string == "string" ? stripHtml(string).result.trim() : string;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(4000);
