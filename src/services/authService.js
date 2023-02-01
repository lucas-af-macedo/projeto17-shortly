import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";
import { conflit } from "../errors/conflit.js";
import { unalthorized } from "../errors/Unalthorized.js";

async function existEmail(email) {
	const query = await authRepository.findEmail(email);

	if (query.rows.length) {
		throw conflit();
	}
}

async function credentialValidation(email, password) {
	const query = await authRepository.findUserByEmail(email);

	if (!query.rows.length) {
		throw unalthorized();
	}
	if (!bcrypt.compareSync(password, query.rows[0].password)) {
		throw unalthorized();
	}
	return query.rows[0];
}

function cryptPassword(password) {
	return bcrypt.hashSync(password, 10);
}

async function postSignUp(name, email, password) {
	const passwordHash = cryptPassword(password);

	await authRepository.insertUser(name, email, passwordHash);
}

async function postSignIn(userId, token) {
	const oldSession = await authRepository.selectSession(userId);

	if (oldSession.rows.length) {
		await authRepository.deleteSession(userId);
	}

	await authRepository.insertSession(userId, token);
}

const authService = {
	postSignUp,
	postSignIn,
	existEmail,
	credentialValidation,
};

export default authService;
