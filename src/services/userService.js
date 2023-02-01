import userRepository from "../repositories/userRepository.js";

async function queryUser(userId) {
	return await userRepository.queryUser(userId);
}

const userService = {
	queryUser,
};

export default userService;
