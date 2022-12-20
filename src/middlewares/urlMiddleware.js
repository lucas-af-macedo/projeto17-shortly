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
        res.locals.url = url;
    }
    next();
}