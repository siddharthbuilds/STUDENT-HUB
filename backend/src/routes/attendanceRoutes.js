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
router.get('/get/course-summary/:semId',courseSummaryController);
router.get('/get/plan-your-bunks/:semId',planYourBunksController);
export default router;