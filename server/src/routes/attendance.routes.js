import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { findCarpenterById, showCarpenters } from "../controllers/attendance.controller.js";

const router = Router();

router.route('/showCarpenters').get(protect, showCarpenters)
router.route('/findCarpenterById/:id').get(protect, findCarpenterById)

export default router;