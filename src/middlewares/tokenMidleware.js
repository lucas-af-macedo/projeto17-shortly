import connection from "../database/database.js";

export async function tokenValidation(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	try {
		const user = await connection.query(
			"SELECT * FROM sessions WHERE token = $1",
			[token]
		);

		if (user.rows.length) {
			res.locals.userId = user.rows[0].userId;
			next();
		} else {
			res.sendStatus(401);
		}
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}
