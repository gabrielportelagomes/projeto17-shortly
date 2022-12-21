import { userSchema } from "../schemas/userSchema.js";

export function userSchemaValidation(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const user = {
    name,
    email,
    password,
    confirmPassword
  };

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }

  res.locals.user = user;

  next();
}
