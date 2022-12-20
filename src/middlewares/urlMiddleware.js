import connection from "../database/database.js";
import urlSchema from "../schemas/urlSchema.js";
import { cleanStringData } from "../server.js";

export async function urlValidation (req, res, next){
    const url = {};

    Object.keys(req.body).forEach(
        (key) => url[key] = cleanStringData(req.body[key])
    );

    const validation = urlSchema.validate(url, { abortEarly: false });
    
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        res.status(422).send(errors)
        return;
    } else{
        res.locals.url = url.url;
    }
    next();
}

export async function urlOwner (req, res, next){
    const userId = res.locals.userId;
    const id = req.params.id;
    try{
        const query = await connection.query('SELECT * FROM urls WHERE id=$1',[id]);
        if (query.rows.length){
            if(query.rows[0].userId===userId){
                next();
            } else{
                res.sendStatus(401);
            }
        } else{
            res.sendStatus(404);
        }
    } catch (err){
        res.sendStatus(500);
        console.log(err);
    }
}