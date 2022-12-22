export function validate(schema, parameter) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const erros = error.details.map((detail) => detail.message);
      return res.status(422).send(erros);
    }

    res.locals[parameter] = req.body;
    next();
  };
}
