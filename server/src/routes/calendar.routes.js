import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getEvents, postEvent, updateEvent, getEvents2, deleteAllCalendar, deleteRange, fetchIds } from "../controllers/calendar.controller.js";

const router = Router();

router.route('/postEvent').post(protect, postEvent)
router.route('/updateEvent/:id').put(protect, updateEvent)
router.route('/getEvents/:id').get(protect, getEvents)
router.route('/getEvents2/:id').get(protect, getEvents2)
router.route('/deleteAllCalendar/:id').delete(protect, deleteAllCalendar)
router.route('/deleteRange').delete(protect, deleteRange)
router.route('/fetchIds').post(protect, fetchIds)

export default router;