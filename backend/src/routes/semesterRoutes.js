import {Router} from "express"
import getSemestersController from "../controllers/getSemestersController.js";
const router = Router()

router.get('/get-all-semesters',getSemestersController);
export default router;