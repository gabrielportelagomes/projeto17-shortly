import { selectUserByIdAndEmail } from "../repository/usersRepositories.js";
import jwt from "jsonwebtoken";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const secretkey = process.env.JWT_SECRET;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const userData = jwt.verify(token, secretkey);

    if (!userData) {
      return res.sendStatus(401);
    }

    const { userId, userEmail } = userData;

    const userExists = await selectUserByIdAndEmail(userId, userEmail);

    if (userExists.rows.length === 0) {
      return res.sendStatus(401);
    }

    const user = userExists.rows[0];

    res.locals.user = user;
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  next();
}
