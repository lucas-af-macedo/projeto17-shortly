import authService from "../services/authService.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
	const user = res.locals.user;

	try {
		await authService.existEmail(user.email);

		await authService.postSignUp(user.name, user.email, user.password);

		res.sendStatus(201);
	} catch (err) {
		if (err.name === "Conflit") {
			return res.sendStatus(409);
		}
		res.sendStatus(500);
		console.log(err);
	}
}

export async function signIn(req, res) {
	const signIn = res.locals.signIn;
	const token = uuid();

	try {
		const user = await authService.credentialValidation(
			signIn.email,
			signIn.password
		);

		await authService.postSignIn(user.id, token);

		res.status(200).send({ token });
	} catch (err) {
		if (err.name === "Unalthorized") {
			return res.sendStatus(401);
		}
		res.sendStatus(500);
		console.log(err);
	}
}
