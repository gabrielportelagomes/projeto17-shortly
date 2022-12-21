import connection from "../database/db.js";

export async function authValidation(req, res, next) {
  const { userId, userEmail } = res.locals.userData;

  try {
    const userExists = await connection.query(
      `SELECT id FROM users WHERE id=$1 AND email=$2;`,
      [userId, userEmail]
    );

    if (userExists.rows.length === 0) {
      return res.sendStatus(401);
    }

    const user = userExists.rows[0];

    res.locals.user = user;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
