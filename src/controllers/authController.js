import connection from "../database/database.js";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
	const now = dayjs().format("YYYY-MM-DD HH:mm");
	const user = res.locals.user;

	const passwordHash = bcrypt.hashSync(user.password, 10);

	try {
		await connection.query(
			'INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, $4)',
			[user.name, user.email, passwordHash, now]
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
	const now = dayjs().format("YYYY-MM-DD HH:mm");

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
			'INSERT INTO sessions ("userId", token, "createdAt") VALUES ($1, $2, $3)',
			[user.id, token, now]
		);

		res.status(200).send({ token });
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}
