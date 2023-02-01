import signInSchema from "../schemas/signInSchema.js";
import { cleanStringData } from "../server.js";

export async function signInValidation(req, res, next) {
	const signIn = {};

	Object.keys(req.body).forEach(
		(key) => (signIn[key] = cleanStringData(req.body[key]))
	);

	const validation = signInSchema.validate(signIn, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(422).send(errors);
		return;
	} else {
		res.locals.signIn = signIn;
	}
	next();
}
