import {Router} from "express";
import {getAttendanceController,
        updateAttendanceController,
        courseSummaryController,
        planYourBunksController
} from "../controllers/attendanceController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";
import { verifyUser } from "../middlewares/verifyMiddleware.js";

const router = Router();

router.use(authenticateToken);

router.patch('/update/:semId',verifyUser,updateAttendanceController);
router.get('/get/course-summary/:semId',verifyUser,courseSummaryController);
router.get('/get/plan-your-bunks/:semId',verifyUser,planYourBunksController);
router.get('/get/:semId/:date',verifyUser,getAttendanceController);
export default router;