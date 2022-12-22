import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  insertUser,
  selectRanking,
  selectUserInfos,
} from "../repository/usersRepositories.js";

export async function postSignUp(req, res) {
  const { name, email, password } = res.locals.user;

  try {
    const hashPassword = bcrypt.hashSync(password, 12);

    await insertUser(name, email, hashPassword);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postSignIn(req, res) {
  const { email } = res.locals.login;
  const id = res.locals.userId;

  try {
    const userData = { userId: id, userEmail: email };
    const secretkey = process.env.JWT_SECRET;
    const settings = { expiresIn: 60 * 60 * 24 * 30 };

    const token = jwt.sign(userData, secretkey, settings);

    res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getUserInfos(req, res) {
  const { userId } = req.user;

  try {
    const { rows } = await selectUserInfos(userId);

    res.status(200).send(rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const { rows } = await selectRanking();

    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
