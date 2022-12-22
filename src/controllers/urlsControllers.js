import { nanoid } from "nanoid";
import {
  insertUrl,
  selectUrl,
  selectUrlInfos,
  updateVisitCount,
} from "../repository/urlsRepositories.js";

export async function postUrl(req, res) {
  const url = res.locals.url;
  const user = res.locals.user;
  const id = user.id;

  const shortUrl = nanoid(6);

  try {
    await insertUrl(id, url, shortUrl);

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
    await deleteUrl(urlId);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
