import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { findCarpenterById, showCarpenters, showMistry, findMistryById } from "../controllers/attendance.controller.js";

const router = Router();

router.route('/showCarpenters').get(protect, showCarpenters)
router.route('/showMistry').get(protect, showMistry)
router.route('/findCarpenterById/:id').get(protect, findCarpenterById)
router.route('/findMistryById/:id').get(protect, findMistryById)

export default router;