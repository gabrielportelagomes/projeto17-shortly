import { Router } from "express";
import {
  getRanking,
  getUserInfos,
  postSignIn,
  postSignUp,
} from "../controllers/usersControllers.js";
import { authValidation } from "../middlewares/authValidation.js";
import { validate } from "../middlewares/schemaValidation.js";
import { signInValidation } from "../middlewares/signInValidation.js";
import { signUpValidation } from "../middlewares/signUpValidation.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { userSchema } from "../schemas/userSchema.js";

const usersRouter = Router();

usersRouter.post(
  "/signup",
  validate(userSchema, "signUp"),
  signUpValidation,
  postSignUp
);
usersRouter.post(
  "/signin",
  validate(signInSchema, "signIn"),
  signInValidation,
  postSignIn
);
usersRouter.get("/users/me", authValidation, getUserInfos);
usersRouter.get("/ranking", getRanking);

export default usersRouter;
