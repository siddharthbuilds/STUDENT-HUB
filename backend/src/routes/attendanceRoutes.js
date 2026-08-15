import {Router} from "express";
import {getAttendanceController,
        updateAttendanceController,
        courseSummaryController,
        planYourBunksController
} from "../controllers/attendanceController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticateToken);

router.patch('/update/:semId',updateAttendanceController);
router.get('/get/course-summary/:semId',courseSummaryController);
router.get('/get/plan-your-bunks/:semId',planYourBunksController);
router.get('/get/:semId/:date',getAttendanceController);
export default router;