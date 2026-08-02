import {Router} from "express";
import { getAttendanceController } from "../controllers/attendanceController.js";
import { updateAttendanceController } from "../controllers/attendanceController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticateToken);

router.get('/get-attendance/:date',getAttendanceController);
router.patch('/update-attendance/:attendanceId',updateAttendanceController);
export default router;