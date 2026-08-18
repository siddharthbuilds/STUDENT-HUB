import {Router} from "express";
import { getGradesController } from "../controllers/gradeController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = Router();
router.use(authenticateToken);
router.get('/get',getGradesController);
export default router