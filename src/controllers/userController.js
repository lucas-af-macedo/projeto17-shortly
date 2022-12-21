import connection from "../database/database.js";

export async function userData (req, res){
    const userId = res.locals.userId;

    try{
        const query = await connection.query(`
            SELECT 
                users.id,
                users.name,
                SUM (urls."visitCount")::INTEGER as "visitCount",
                array_agg(
                    json_build_object(
                        'id', urls.id, 
                        'url', urls.url, 
                        'shortUrl', urls."shortUrl", 
                        'visitCount', urls."visitCount") 
                    ORDER BY urls.id) 
                as "shortenedUrls"
            FROM 
                users
            INNER JOIN urls
            ON users.id=urls."userId"
            WHERE users.id=$1
            GROUP BY users.id
            `,[userId]);
            
        res.status(200).send(query.rows);
    } catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}