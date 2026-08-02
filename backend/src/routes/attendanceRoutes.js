import {Router} from "express";
import { getAttendanceController } from "../controllers/attendanceController.js";
import { updateAttendanceController } from "../controllers/attendanceController.js";
import { courseSummaryController } from "../controllers/attendanceController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticateToken);

router.get('/get-attendance/:date',getAttendanceController);
router.patch('/update-attendance',updateAttendanceController);
router.get('/get-course-summary/:semId',courseSummaryController);
export default router;