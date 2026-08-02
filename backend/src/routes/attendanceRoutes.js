import {Router} from "express";
import { getAttendanceController } from "../controllers/attendanceController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticateToken);

router.get('/get-attendance/:date',getAttendanceController);
export default router;