import { Router } from "express";
import {
  deleteUrl,
  getRedirectUrl,
  getUrl,
  postUrl,
} from "../controllers/urlsControllers.js";
import { authValidation } from "../middlewares/authValidation.js";
import { urlOwnerValidation } from "../middlewares/urlOwnerValidation.js";
import { urlSchemaValidation } from "../middlewares/urlSchemaValidation.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authValidation, urlSchemaValidation, postUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", getRedirectUrl);
urlsRouter.delete("/urls/:id", authValidation, urlOwnerValidation, deleteUrl);

export default urlsRouter;
