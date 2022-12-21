import jwt from "jsonwebtoken";

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const secretkey = process.env.JWT_SECRET;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const userData = jwt.verify(token, secretkey);

    res.locals.userData = userData;
  } catch {
    return res.sendStatus(401);
  }

  next();
}
