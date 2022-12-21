import connection from "../database/db.js";

export async function signUpValidation(req, res, next) {
  const { email, password, confirmPassword } = res.locals.user;

  try {
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Senhas divergentes!" });
    }

    const emailExists = await connection.query(
      `SELECT * FROM users WHERE email=$1;`,
      [email]
    );

    if (emailExists.rows.length > 0) {
      return res.sendStatus(409);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
