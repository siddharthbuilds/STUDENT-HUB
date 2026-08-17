import {Router} from "express";
import {registerMiddleware,loginMiddleware,authenticateToken} from "../middlewares/authMiddleware.js"
import {registerController,loginController} from "../controllers/authController.js";
import { userDetailsController } from "../controllers/userDetailsController.js";

const router = Router();
router.post('/register',registerMiddleware,registerController);
router.post('/login',loginMiddleware,loginController);
router.get('/user-details',authenticateToken,userDetailsController);

export default router