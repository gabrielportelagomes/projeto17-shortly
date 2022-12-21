import { Router } from "express";
import {
  getRedirectUrl,
  getUrl,
  postUrl,
} from "../controllers/urlsControllers.js";
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
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", getRedirectUrl);

export default urlsRouter;
