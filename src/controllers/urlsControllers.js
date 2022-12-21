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
