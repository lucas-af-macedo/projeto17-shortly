import connection from "../database/database.js";

async function insert(userId, url, shortUrl) {
	await connection.query(
		'INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)',
		[userId, url, shortUrl]
	);
}

async function select(id) {
	return await connection.query('SELECT * FROM urls WHERE "id"=$1', [id]);
}

async function selectByUrl(shortUrl) {
	return await connection.query('SELECT * FROM urls WHERE "shortUrl"=$1', [
		shortUrl,
	]);
}

async function incrementVisit(shortUrl) {
	await connection.query(
		'UPDATE urls SET "visitCount"="visitCount" + 1 WHERE "shortUrl"=$1',
		[shortUrl]
	);
}

async function deleteUrl(id) {
	await connection.query("DELETE FROM urls WHERE id=$1", [urlId]);
}

const urlRepository = {
	insert,
	select,
	selectByUrl,
	incrementVisit,
	deleteUrl,
};

export default urlRepository;
