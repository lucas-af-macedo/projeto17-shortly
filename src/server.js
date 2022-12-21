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

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
