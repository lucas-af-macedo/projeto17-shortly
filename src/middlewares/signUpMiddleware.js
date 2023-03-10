import connection from "../database/database.js";
import signUpSchema from "../schemas/signUpSchema.js";
import { cleanStringData } from "../server.js";

export async function signUpValidation(req, res, next) {
	const user = {};

	Object.keys(req.body).forEach(
		(key) => (user[key] = cleanStringData(req.body[key]))
	);

	const validation = signUpSchema.validate(user, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(422).send(errors);
		return;
	} else {
		res.locals.user = user;
	}
	next();
}

export async function samePassword(req, res, next) {
	const user = res.locals.user;

	if (user.password !== user.confirmPassword) {
		res.status(422).send({ message: `The password don't match.` });
		return;
	}
	next();
}
