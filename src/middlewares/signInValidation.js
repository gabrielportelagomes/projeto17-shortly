import connection from "../database/db.js";
import bcrypt from "bcrypt";

export async function signInValidation(req, res, next) {
  const { email, password } = res.locals.login;

  try {
    const user = await connection.query(`SELECT * FROM users WHERE email=$1;`, [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.sendStatus(401);
    }

    const passwordCheck = bcrypt.compareSync(password, user.rows[0].password);

    if (!passwordCheck) {
      return res.sendStatus(401);
    }

    const id = user.rows[0].id;

    res.locals.userId = id;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
