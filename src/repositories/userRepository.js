import connection from "../database/database.js";

async function queryUser(userId) {
	return await connection.query(
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
}

const userRepository = {
	queryUser,
};

export default userRepository;
