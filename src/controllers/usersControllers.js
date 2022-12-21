import bcrypt from "bcrypt";
import connection from "../database/db.js";

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
