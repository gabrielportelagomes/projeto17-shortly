import { signInSchema } from "../schemas/signInSchema.js";


export function signInSchemaValidation(req, res, next) {
  const { email, password} = req.body;

  const signIn = {
    email,
    password
  };

  const { error } = signInSchema.validate(signIn, { abortEarly: false });

  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }

  res.locals.login = signIn;

  next();
}
