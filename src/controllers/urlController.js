import connection from "../database/database.js";
import { nanoid } from "nanoid";
import dayjs from "dayjs";


export async function postUrl (req, res){
    const now = dayjs().format("YYYY-MM-DD HH:mm");
    const userId = res.locals.userId;
    const url = res.locals.url;
    const shortUrl = nanoid(6);

    try{
        await connection.query('INSERT INTO urls ("userId", url, "shortUrl", "visitCount", "createdAt") VALUES ($1, $2, $3, 0)',[userId, url, shortUrl, now]);
        res.status(201).send({shortUrl});
    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

export async function getOneUrl (req, res){
    const id = req.params.id;

    try{
        const query = await connection.query('SELECT * FROM urls WHERE "id"=$1',[id]);

        if (query.rows.length){
            const url = query.rows[0];
            delete url.userId;
            delete url.visitCount;
            res.status(200).send(url);
        } else{
            res.sendStatus(404);
        }

    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

export async function openUrl (req, res){
    const shortUrl = req.params.shortUrl;
    try{
        const query = await connection.query('SELECT * FROM urls WHERE "shortUrl"=$1',[shortUrl]);
        if(query.rows.length){
            const urls = query.rows[0];

            res.status(301).redirect(urls.url);

            await connection.query('UPDATE urls SET "visitCount"="visitCount" + 1 WHERE "shortUrl"=$1',[shortUrl]);
        } else{
            res.sendStatus(404);
        }
    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

export async function deleteUrl (req, res){
    const urlId = req.params.id;

    try{
        await connection.query('DELETE FROM urls WHERE id=$1',[urlId]);

        res.sendStatus(204);
    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}