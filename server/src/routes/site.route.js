import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { addSite, fetchSites, fetchSite, fetchSitesPlywood, addPlywoodDetails, fetchPlywoodDetails, updateTotal } from "../controllers/site.controller.js";

const router = Router();

router.route("/addSite").post(protect, addSite)
router.route("/fetchSites").get(protect, fetchSites)
router.route("/fetchSite/:id").get(protect, fetchSite)
router.route("/fetchSitesPlywood").get(protect, fetchSitesPlywood)
router.route("/addPlywoodDetails").patch(protect, addPlywoodDetails)
router.route("/fetchPlywoodDetails/:id").get(protect, fetchPlywoodDetails)
router.route("/updateTotal/:id").post(protect, updateTotal)


export default router;