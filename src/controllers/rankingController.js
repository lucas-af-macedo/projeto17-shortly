import connection from "../database/database.js";

export async function ranking (req, res){
    try{
        res.sendStatus(501);
    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}