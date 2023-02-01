import connection from "../database/database.js";

async function getRanking() {
	return (
		await connection.query(`
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
            `)
	).rows;
}

const rankingRepository = {
	getRanking,
};

export default rankingRepository;
