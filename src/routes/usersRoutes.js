import { Router } from "express";
import {
  getRanking,
  getUserInfos,
  postSignIn,
  postSignUp,
} from "../controllers/usersControllers.js";
import { authValidation } from "../middlewares/authValidation.js";
import { signInSchemaValidation } from "../middlewares/signInSchemaValidation.js";
import { signInValidation } from "../middlewares/signInValidation.js";
import { signUpValidation } from "../middlewares/signUpValidation.js";

import { userSchemaValidation } from "../middlewares/userSchemaValidation.js";

const usersRouter = Router();

usersRouter.post("/signup", userSchemaValidation, signUpValidation, postSignUp);
usersRouter.post(
  "/signin",
  signInSchemaValidation,
  signInValidation,
  postSignIn
);
usersRouter.get("/users/me", authValidation, getUserInfos);
usersRouter.get("/ranking", getRanking);

export default usersRouter;
