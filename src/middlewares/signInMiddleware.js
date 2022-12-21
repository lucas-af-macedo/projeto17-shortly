import connection from "../database/database.js";
import signInSchema from "../schemas/signInSchema.js";
import { cleanStringData } from "../server.js";
import bcrypt from "bcrypt";

export async function signInEmailValidation(req, res, next) {
	const signIn = res.locals.signIn;

	try {
		const email = await connection.query(
			"SELECT * FROM users WHERE email = $1",
			[signIn.email]
		);

		if (email.rows.length) {
			res.locals.user = email.rows[0];
			next();
		} else {
			res.status(401).send({ message: "Usuário e/ou senha inválidos!" });
		}
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}

export async function passwordValidation(req, res, next) {
	const signIn = res.locals.signIn;
	const password = res.locals.user.password;

	try {
		if (bcrypt.compareSync(signIn.password, password)) {
			next();
		} else {
			res.status(401).send({ message: "Usuário e/ou senha inválidos!" });
		}
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}

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
