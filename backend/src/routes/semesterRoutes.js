import {Router} from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = Router()

router.use(authenticateToken);

router.post('/add-semester')
export default router;