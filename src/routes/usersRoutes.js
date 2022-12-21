import { Router } from "express";
import { postSignUp } from "../controllers/usersControllers.js";
import { signUpValidation } from "../middlewares/signUpValidation.js";
import { userSchemaValidation } from "../middlewares/userSchemaValidation.js";

const usersRouter = Router();

usersRouter.post("/signup", userSchemaValidation, signUpValidation, postSignUp);

export default usersRouter;
