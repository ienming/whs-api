import { Router } from "express";
import graphRouter from "./graph-route.js";

const router = Router();
router.use('/graph', graphRouter);
router.use('/health', (request, response) => response.json({ status: 'ok' }));

export default router;