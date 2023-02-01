import connection from "../database/database.js";
import urlService from "../services/urlService.js";

export async function postUrl(req, res) {
	const userId = res.locals.userId;
	const url = res.locals.url;

	try {
		await urlService.postUrl(userId, url);

		res.status(201).send({ shortUrl });
	} catch (err) {
		res.sendStatus(500);
		console.log(err);
	}
}

export async function getOneUrl(req, res) {
	const id = req.params.id;

	try {
		const url = await urlService.getOneUrl(id);

		res.status(200).send(url);
	} catch (err) {
		if (err.name === "NotFoundError") {
			return res.sendStatus(404);
		}
		return res.sendStatus(500);
		console.log(err);
	}
}

export async function openUrl(req, res) {
	const shortUrl = req.params.shortUrl;
	try {
		const urls = await urlService.openUrl(shortUrl);

		return res.status(301).redirect(urls.url);
	} catch (err) {
		if (err.name === "NotFoundError") {
			return res.sendStatus(404);
		}
		return res.sendStatus(500);
		console.log(err);
	}
}

export async function deleteUrl(req, res) {
	const userId = res.locals.userId;
	const urlId = req.params.id;

	try {
		await urlService.urlOwner(userId, urlId);

		await urlService.deleteUrl(urlId);

		res.sendStatus(204);
	} catch (err) {
		if (err.name === "NotFoundError") {
			return res.sendStatus(404);
		} else if (err.name === "Unalthorized") {
			return res.sendStatus(401);
		}
		res.sendStatus(500);
		console.log(err);
	}
}
