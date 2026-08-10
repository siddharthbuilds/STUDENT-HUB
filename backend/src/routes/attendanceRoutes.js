import {Router} from "express";
import {getAttendanceController,
        updateAttendanceController,
        courseSummaryController,
        planYourBunksController
} from "../controllers/attendanceController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticateToken);

router.patch('/update',updateAttendanceController);
router.get('/get/course-summary',courseSummaryController);
router.get('/get/plan-your-bunks',planYourBunksController);
router.get('/get/:date',getAttendanceController);
export default router;