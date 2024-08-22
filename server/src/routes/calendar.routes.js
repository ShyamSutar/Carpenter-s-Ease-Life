import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getEvents, postEvent, updateEvent } from "../controllers/calendar.controller.js";

const router = Router();

router.route('/postEvent').post(protect, postEvent)
router.route('/updateEvent/:id').put(protect, updateEvent)
router.route('/getEvents/:id').get(protect, getEvents)

export default router;