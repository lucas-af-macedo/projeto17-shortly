import rankingService from "../services/rankingService.js";

export async function ranking(req, res) {
	try {
		const ranking = rankingService.getRanking();

		res.status(200).send(ranking);
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}
