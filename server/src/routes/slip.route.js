import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { addSlip, showSlipMistry, showSlipCarpenter } from "../controllers/slip.controller.js";

const router = Router();

router.route('/addSlip/:id').post(protect, addSlip);
router.route('/showSlipMistry').get(protect, showSlipMistry)
router.route('/showSlipCarpenter').get(protect, showSlipCarpenter)

export default router;