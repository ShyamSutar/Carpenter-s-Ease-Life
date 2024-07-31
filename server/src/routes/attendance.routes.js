import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { showCarpenters } from "../controllers/attendance.controller.js";

const router = Router();

router.route('/showCarpenters').get(protect, showCarpenters)

export default router;