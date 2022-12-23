import connection from "../database/database.js";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
	const user = res.locals.user;

	const passwordHash = bcrypt.hashSync(user.password, 10);

	try {
		await connection.query(
			"INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
			[user.name, user.email, passwordHash]
		);
		res.sendStatus(201);
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}

export async function signIn(req, res) {
	const user = res.locals.user;
	const token = uuid();

	try {
		const oldSession = await connection.query(
			'SELECT * FROM sessions WHERE "userId"=$1',
			[user.id]
		);
		if (oldSession.rows.length) {
			await connection.query('DELETE FROM sessions WHERE "userId"=$1', [
				user.id,
			]);
		}

		await connection.query(
			'INSERT INTO sessions ("userId", token) VALUES ($1, $2)',
			[user.id, token]
		);

		res.status(200).send({ token });
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}
