import {Router} from "express";
import { getGradesController, updateGradesController} from "../controllers/gradeController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(authenticateToken);

router.get('/get',getGradesController);
router.patch('/update',updateGradesController);

export default router