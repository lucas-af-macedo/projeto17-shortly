import connection from "../database/database.js";

export async function signUp (req, res){
    try{
        res.sendStatus(501);
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