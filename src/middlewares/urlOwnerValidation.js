import connection from "../database/db.js";

export async function urlOwnerValidation(req, res, next) {
  const { id } = req.params;
  const user = res.locals.user;
  const userId = user.id;

  try {
    const { rows } = await connection.query(
      `SELECT * FROM urls WHERE id=$1 AND "userId"=$2;`,
      [id, userId]
    );

    if (rows.length === 0) {
      return res.sendStatus(401);
    }

    const url = rows[0];
    
    res.locals.url = url;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
