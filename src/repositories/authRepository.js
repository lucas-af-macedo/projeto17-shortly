import connection from "../database/database.js";

async function findEmail(email) {
	return await connection.query("SELECT * FROM users WHERE email = $1", [
		email,
	]);
}

async function findUserByEmail(email) {
	return await connection.query("SELECT * FROM users WHERE email = $1", [
		email,
	]);
}

async function insertUser(name, email, passwordHash) {
	await connection.query(
		"INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
		[name, email, passwordHash]
	);
}

async function selectSession(userId) {
	return await connection.query('SELECT * FROM sessions WHERE "userId"=$1', [
		userId,
	]);
}

async function deleteSession(userId) {
	await connection.query('DELETE FROM sessions WHERE "userId"=$1', [userId]);
}

async function insertSession(userId, token) {
	await connection.query(
		'INSERT INTO sessions ("userId", token) VALUES ($1, $2)',
		[userId, token]
	);
}

const authRepository = {
	insertUser,
	selectSession,
	deleteSession,
	insertSession,
	findEmail,
	findUserByEmail,
};

export default authRepository;
