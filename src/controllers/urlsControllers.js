import { nanoid } from "nanoid";
import connection from "../database/db.js";

export async function postUrl(req, res) {
  const url = res.locals.url;
  const user = res.locals.user;
  const id = user.id;

  const shortUrl = nanoid(6);

  try {
    await connection.query(
      `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);`,
      [id, url, shortUrl]
    );

    res.status(201).send({ shortUrl });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await connection.query(
      `SELECT id, "shortUrl", url FROM urls WHERE id=$1;`,
      [id]
    );

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
    const { rows } = await connection.query(
      `SELECT url FROM urls WHERE "shortUrl"=$1;`,
      [shortUrl]
    );

    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    await connection.query(
      `UPDATE urls SET "visitCount"="visitCount"+1 WHERE "shortUrl"=$1;`,
      [shortUrl]
    );

    const url = rows[0].url;

    res.redirect(url);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
