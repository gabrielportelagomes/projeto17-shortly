import { Router } from "express";
import {
  deleteUrl,
  getRedirectUrl,
  getUrl,
  postUrl,
} from "../controllers/urlsControllers.js";
import { authValidation } from "../middlewares/authValidation.js";
import { validate } from "../middlewares/schemaValidation.js";
import { urlOwnerValidation } from "../middlewares/urlOwnerValidation.js";
import { urlSchema } from "../schemas/urlSchema.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  authValidation,
  validate(urlSchema, "url"),
  postUrl
);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", getRedirectUrl);
urlsRouter.delete("/urls/:id", authValidation, urlOwnerValidation, deleteUrl);

export default urlsRouter;
