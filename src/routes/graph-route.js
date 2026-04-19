import { Router } from "express";
import * as graphController from '../controllers/graph-controller.js';

const router = Router();
router.get('/', graphController.getGraphData);

export default router;