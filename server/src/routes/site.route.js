import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { addSite, fetchSites, fetchSite } from "../controllers/site.controller.js";

const router = Router();

router.route("/addSite").post(protect, addSite)
router.route("/fetchSites").get(protect, fetchSites)
router.route("/fetchSite/:id").get(protect, fetchSite)



export default router;