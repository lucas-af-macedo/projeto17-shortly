import connection from "../database/database.js";

export async function userData(req, res) {
	const userId = res.locals.userId;

	try {
		const query = await connection.query(
			`
            SELECT 
                users.id,
                users.name,
                COALESCE(SUM (urls."visitCount"), 0)::INTEGER as "visitCount",
                COALESCE(
                    array_agg(
                        json_build_object(
                            'id', urls.id, 
                            'url', urls.url, 
                            'shortUrl', urls."shortUrl", 
                            'visitCount', urls."visitCount") 
                        ORDER BY urls."visitCount") 
                        FILTER (where urls.id is not null)
                    , ARRAY[]::json[])
                as "shortenedUrls"
            FROM 
                users
            LEFT JOIN urls
            ON users.id=urls."userId"
            WHERE users.id=$1
            GROUP BY users.id, users.name
            `,
			[userId]
		);

		res.status(200).send(query.rows);
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}
