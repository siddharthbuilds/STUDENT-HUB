import {Router} from "express";
import {registerMiddleware,loginMiddleware} from "../middlewares/authMiddleware.js"
import {registerController,loginController} from "../controllers/authController.js";

const router = Router();
router.post('/register',registerMiddleware,registerController);
router.post('/login',loginMiddleware,loginController);

export default router