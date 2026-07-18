import {Router} from "express"
import getSemestersController from "../controllers/getSemestersController.js";
import removeSemestersController from "../controllers/removeSemesterController.js";
const router = Router()

router.post('/get-all-semesters',getSemestersController);
router.post('/remove-semester',removeSemestersController);
export default router;