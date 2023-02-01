import { unalthorized } from "../errors/Unalthorized.js";
import { notFoundError } from "../errors/notFound.js";
import urlRepository from "../repositories/urlRepository.js";
import { nanoid } from "nanoid";

async function getShortUrl() {
	return nanoid(6);
}

async function postUrl(userId, url) {
	const shortUrl = getShortUrl();
	await urlRepository.insert(userId, url, shortUrl);
}

async function urlOwner(userId, urlId) {
	const query = await urlRepository.select(urlId);

	if (query.rows.length) {
		if (query.rows[0].userId !== userId) {
			throw unalthorized();
		}
	} else {
		throw notFoundError();
	}
}

async function getOneUrl(id) {
	const query = await urlRepository.select(id);

	if (query.rows.length) {
		const url = query.rows[0];
		delete url.userId;
		delete url.visitCount;
		return url;
	} else {
		throw notFoundError();
	}
}

async function openUrl(shortUrl) {
	const query = await urlRepository.selectByUrl(shortUrl);

	if (query.rows.length) {
		const urls = query.rows[0];

		await urlRepository.incrementVisit(shortUrl);
		return urls;
	} else {
		throw notFoundError();
	}
}

async function deleteUrl(urlId) {
	await urlRepository.deleteUrl(urlId);
}

const urlService = {
	postUrl,
	getOneUrl,
	deleteUrl,
	openUrl,
	urlOwner,
};

export default urlService;
