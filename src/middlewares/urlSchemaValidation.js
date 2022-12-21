import { urlSchema } from "../schemas/urlSchema.js";

export function urlSchemaValidation(req, res, next) {
  const { url } = req.body;

  const { error } = urlSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }

  res.locals.url = url;

  next();
}
