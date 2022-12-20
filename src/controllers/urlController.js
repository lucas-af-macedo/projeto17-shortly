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
    try{
        res.sendStatus(501);
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