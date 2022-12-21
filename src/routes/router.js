import { Router } from "express";
import urlsRouter from "./urlsRoutes.js";
import usersRouter from "./usersRoutes.js";

const router = Router();

router.use(usersRouter);
router.use(urlsRouter);

export default router;
