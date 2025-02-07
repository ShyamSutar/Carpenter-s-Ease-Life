import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { notificationRequest, showNotification, rejectNotification, approveNotification, notificationRequestPlywood } from "../controllers/notification.controller.js";

const router = Router();

router.route('/notificationRequest').post(protect, notificationRequest)
router.route('/showNotification').get(protect, showNotification)
router.route('/rejectNotification/:carpenterId').delete(protect, rejectNotification)
router.route('/approveNotification/:carpenterId').post(protect, approveNotification)

//plywood
router.route('/notificationRequestPlywood').post(protect, notificationRequestPlywood)


export default router;