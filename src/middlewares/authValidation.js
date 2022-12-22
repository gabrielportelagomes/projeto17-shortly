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
    jwt.verify(token, secretkey, async (error, decoded) => {
      if (error) {
        return res.sendStatus(401);
      }
      const { userId, userEmail } = decoded;

      const userExists = await selectUserByIdAndEmail(userId, userEmail);

      if (userExists.rows.length === 0) {
        return res.sendStatus(401);
      }

      req.user = { userId, userEmail };

      return next();
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
