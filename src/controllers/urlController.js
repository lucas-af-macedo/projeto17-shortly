import connection from "../database/database.js";
import { nanoid } from "nanoid";

export async function postUrl (req, res){
    const userId = res.locals.userId;
    const url = res.locals.url;
    const shortUrl = nanoid()

    try{
        await connection.query('INSERT INTO urls ("userId", url, "shortUrl", "visitCount") VALUES ($1, $2, $3, 0)',[userId, url, shortUrl]);
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
    try{
        res.sendStatus(501);
    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

export async function deleteUrl (req, res){
    try{
        res.sendStatus(501);
    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}