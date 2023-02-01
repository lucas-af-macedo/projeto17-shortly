import userService from "../services/userService.js";

export async function userData(req, res) {
	const userId = res.locals.userId;

	try {
		const query = await userService.queryUser(userId);

		res.status(200).send(query.rows);
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}
