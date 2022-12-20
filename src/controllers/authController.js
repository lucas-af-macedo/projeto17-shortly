import connection from "../database/database.js";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

export async function signUp (req, res){
    const now = dayjs().format("YYYY-MM-DD HH:mm");
    const user = {
        ...res.locals.user,
        signupdate: now
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    try{

        await connection.query('INSERT INTO users (name, email, password, "signUpDate") VALUES ($1, $2, $3, $4)', [user.name, user.email, passwordHash, user.signupdate])
        res.sendStatus(201);
    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

export async function signIn (req, res){
    try{
        res.sendStatus(501);
    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}