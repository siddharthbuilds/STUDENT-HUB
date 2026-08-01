import {Router} from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addSemesterController } from "../controllers/semesterController.js";
const router = Router()

router.use(authenticateToken);

router.post('/add-semester',addSemesterController);
export default router;