import { selectUrlByIdAndUserId } from "../repository/urlsRepositories.js";

export async function urlOwnerValidation(req, res, next) {
  const { id } = req.params;
  const user = res.locals.user;
  const userId = user.id;

  try {
    const { rows } = await selectUrlByIdAndUserId(id, userId);

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
