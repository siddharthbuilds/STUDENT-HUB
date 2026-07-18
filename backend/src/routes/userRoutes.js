import {Router} from "express";
import uniqueUserMiddleware from "../middlewares/uniqueUserMiddleware.js"
import registerController from "../controllers/registerController.js";

const router = Router();
router.post('/register',uniqueUserMiddleware,registerController);

export default router