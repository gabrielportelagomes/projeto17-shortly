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
    const userData = { userId: id, UserEmail: email };
    const secretkey = process.env.JWT_SECRET;
    const settings = { expiresIn: 60 * 60 * 24 * 30 };

    const token = jwt.sign(userData, secretkey, settings);

    res.status(201).send({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
