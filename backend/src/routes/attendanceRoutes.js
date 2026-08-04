import {Router} from "express";
import {getAttendanceController,
        updateAttendanceController,
        courseSummaryController,
        planYourBunksController
} from "../controllers/attendanceController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticateToken);

router.get('/get/:date',getAttendanceController);
router.patch('/update',updateAttendanceController);
router.get('/get/course-summary',courseSummaryController);
router.get('/get/plan-your-bunks',planYourBunksController);
export default router;