import { selectUserByEmail } from "../repository/usersRepositories.js";

export async function signUpValidation(req, res, next) {
  const { email, password, confirmPassword } = res.locals.signUp;

  try {
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Senhas divergentes!" });
    }

    const emailExists = await selectUserByEmail(email);

    if (emailExists.rows.length > 0) {
      return res.sendStatus(409);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
