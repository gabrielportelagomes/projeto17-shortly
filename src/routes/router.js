import { Router } from "express";
import usersRouter from "./usersRoutes.js";

const router = Router();

router.use(usersRouter);

export default router;
