import {Router} from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addSemesterController } from "../controllers/semesterController.js";
import { deleteSemesterController } from "../controllers/semesterController.js";
const router = Router();

router.use(authenticateToken);

router.post('/add',addSemesterController);
router.delete('/delete/:semId',deleteSemesterController);
export default router;