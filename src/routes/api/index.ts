import { Router } from "express";
import assetsRoute from "./assets-routes.js";

const router = Router();

router.use("/assets", assetsRoute);

export default router;