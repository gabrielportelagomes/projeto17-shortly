import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/usersControllers.js";
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

export default usersRouter;
