import {Router} from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addSemesterController,
        getSemesterController, deleteSemesterController,semesterSummaryController} 
    from "../controllers/semesterController.js";

const router = Router();

router.use(authenticateToken);

router.post('/add',addSemesterController);
router.get('/',getSemesterController);
router.get('/sem-summary/:semId',semesterSummaryController);
router.delete('/delete/:semId',deleteSemesterController);
export default router;