import { nanoid } from "nanoid";
import {
  deleteUrlById,
  insertUrl,
  selectUrl,
  selectUrlInfos,
  updateVisitCount,
} from "../repository/urlsRepositories.js";

export async function postUrl(req, res) {
  const { url } = res.locals.url;

  const { userId } = req.user;

  const shortUrl = nanoid(6);

  try {
    await insertUrl(userId, url, shortUrl);

    res.status(201).send({ shortUrl });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await selectUrlInfos(id);

    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getRedirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const { rows } = await selectUrl(shortUrl);

    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    await updateVisitCount(shortUrl);

    const url = rows[0].url;

    res.redirect(url);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const url = res.locals.url;
  const urlId = url.id;

  try {
    await deleteUrlById(urlId);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
