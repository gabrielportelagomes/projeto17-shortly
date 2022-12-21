import { Router } from "express";
import { postUrl } from "../controllers/urlsControllers.js";
import { authValidation } from "../middlewares/authValidation.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlSchemaValidation } from "../middlewares/urlSchemaValidation.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  tokenValidation,
  authValidation,
  urlSchemaValidation,
  postUrl
);

export default urlsRouter;
