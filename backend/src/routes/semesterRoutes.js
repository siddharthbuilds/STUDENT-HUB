import {Router} from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addSemesterController,
        getSemesterController, deleteSemesterController} 
    from "../controllers/semesterController.js";

const router = Router();

router.use(authenticateToken);

router.post('/add',addSemesterController);
router.get('/',getSemesterController);
router.delete('/delete/:semId',deleteSemesterController);
export default router;