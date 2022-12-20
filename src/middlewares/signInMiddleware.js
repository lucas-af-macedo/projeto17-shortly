import connection from "../database/database.js";
import signInSchema from "../schemas/signInSchema.js";
import { cleanStringData } from "../server.js";
import bcrypt from 'bcrypt';

export async function signInEmailValidation (req, res, next){
    const user = res.locals.user;

    try{
        const email = await connection.query('SELECT * FROM users WHERE email = $1',[user.email]);
        
        if (email.rows.length){
            res.locals.password = email.rows[0].password;
            next();
        } else {
            res.status(401).send({message: 'Usuário e/ou senha inválidos!'})
        }
    }catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

export async function passwordValidation (req, res, next){
    const user = res.locals.user;
    const password = res.locals.password;

    try{
        if(bcrypt.compareSync(user.password, password)){
            next();
        }else{
            res.status(401).send({message:'Usuário e/ou senha inválidos!'})
        }
    } catch (err){
        res.sendStatus(500);
        console.log(err);
    }
}


export async function signInValidation (req, res, next){
    const user = {};

    Object.keys(req.body).forEach(
        (key) => user[key] = cleanStringData(req.body[key])
    );

    const validation = signInSchema.validate(user, { abortEarly: false });
    
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        res.status(422).send(errors)
        return;
    } else{
        res.locals.user = user;
    }
    next();
}