import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { updatePay } from "../controllers/pay.controller.js";

const router = Router();

// router.route('/updatePay').post(protect, notificationRequest)
router.route('/updatePay').patch(protect, updatePay);

export default router;