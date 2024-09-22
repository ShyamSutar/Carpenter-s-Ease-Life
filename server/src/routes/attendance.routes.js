import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { findCarpenterById, showCarpenters, showMistry, findMistryById, findCarpenterById2, removeCarpenter } from "../controllers/attendance.controller.js";

const router = Router();

router.route('/showCarpenters').get(protect, showCarpenters)
router.route('/showMistry').get(protect, showMistry)
router.route('/findCarpenterById/:id').get(protect, findCarpenterById)
router.route('/findCarpenterById2/:id').get(protect, findCarpenterById2)
router.route('/findMistryById/:id').get(protect, findMistryById)
router.route('/removeCarpenter/:id').delete(protect, removeCarpenter)

export default router;