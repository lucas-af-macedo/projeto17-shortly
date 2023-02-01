import rankingRepository from "../repositories/rankingRepository.js";

async function getRanking() {
	return await rankingRepository.getRanking();
}

const rankingService = {
	getRanking,
};

export default rankingService;
