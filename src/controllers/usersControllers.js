import bcrypt from "bcrypt";
import connection from "../database/db.js";
import jwt from "jsonwebtoken";

export async function postSignUp(req, res) {
  const { name, email, password } = res.locals.user;

  try {
    const hashPassword = bcrypt.hashSync(password, 12);

    await connection.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
      [name, email, hashPassword]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postSignIn(req, res) {
  const { email } = res.locals.login;
  const id = res.locals.userId;

  try {
    const userData = { userId: id, userEmail: email };
    const secretkey = process.env.JWT_SECRET;
    const settings = { expiresIn: 60 * 60 * 24 * 30 };

    const token = jwt.sign(userData, secretkey, settings);

    res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getUserInfos(req, res) {
  const user = res.locals.user;
  const userId = user.id;

  try {
    const { rows } = await connection.query(
      `SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount", 
      JSON_AGG(JSON_BUILD_OBJECT('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")) AS "shortenedUrls" 
      FROM users 
      JOIN urls ON urls."userId"=users.id 
      WHERE users.id=$1 GROUP BY users.id;`,
      [userId]
    );

    res.status(200).send(rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const { rows } = await connection.query(
      `SELECT users.id, users.name, COUNT(urls."shortUrl") AS "linksCount", SUM(COALESCE(urls."visitCount", 0)) AS "visitCount" 
      FROM users
      LEFT JOIN urls ON urls."userId"=users.id 
      GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10`
    );

    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
