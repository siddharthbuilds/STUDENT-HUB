import {Router} from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addSemesterController,
        getSemesterController, deleteSemesterController,semesterSummaryController} 
    from "../controllers/semesterController.js";
import { verifyUser } from "../middlewares/verifyMiddleware.js";

const router = Router();

router.use(authenticateToken);

router.post('/add',addSemesterController);
router.get('/',getSemesterController);
router.get('/sem-summary/:semId',verifyUser,semesterSummaryController);
router.delete('/delete/:semId',verifyUser,deleteSemesterController);
export default router;