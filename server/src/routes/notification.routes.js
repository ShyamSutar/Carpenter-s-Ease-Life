import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { notificationRequest, showNotification, rejectNotification, approveNotification, notificationRequestPlywood, showNotificationPlywood, rejectNotificationPlywood, approveNotificationPlywood, notificationRequestHardware, showNotificationHardware, rejectNotificationHardware, approveNotificationHardware } from "../controllers/notification.controller.js";

const router = Router();

router.route('/notificationRequest').post(protect, notificationRequest)
router.route('/showNotification').get(protect, showNotification)
router.route('/rejectNotification/:carpenterId').delete(protect, rejectNotification)
router.route('/approveNotification/:carpenterId').post(protect, approveNotification)

//plywood
router.route('/notificationRequestPlywood').post(protect, notificationRequestPlywood)
router.route('/showNotificationPlywood').get(protect, showNotificationPlywood)
router.route('/rejectNotificationPlywood/:mistryId/:site').delete(protect, rejectNotificationPlywood)
router.route('/approveNotificationPlywood/:mistryId/:site').patch(protect, approveNotificationPlywood)

//hardware
router.route('/notificationRequestHardware').post(protect, notificationRequestHardware)
router.route('/showNotificationHardware').get(protect, showNotificationHardware)
router.route('/rejectNotificationHardware/:mistryId/:site').delete(protect, rejectNotificationHardware)
router.route('/approveNotificationHardware/:mistryId/:site').patch(protect, approveNotificationHardware)

export default router;