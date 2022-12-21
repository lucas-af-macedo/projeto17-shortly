import connection from "../database/database.js";

export async function ranking (req, res){
    try{
        const query = await connection.query(`
            SELECT 
                users.id,
                users.name,
                COALESCE(COUNT (urls), 0)::INTEGER as "linksCount",
                COALESCE(SUM (urls."visitCount"), 0)::INTEGER as "visitCount"
            FROM 
                users
            LEFT JOIN urls
            ON users.id=urls."userId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10
            `);
            
        res.status(200).send(query.rows);
    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}