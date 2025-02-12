import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { addSite, fetchSites, fetchSite, fetchSitesPlywood, addPlywoodDetails, fetchPlywoodDetails, updateTotal, deletePlywood, editPlywood, fetchSitesHardware, addHardwareDetails, fetchSiteHardware, fetchHardwareDetails } from "../controllers/site.controller.js";

const router = Router();

router.route("/addSite").post(protect, addSite)
router.route("/fetchSites").get(protect, fetchSites)
router.route("/fetchSite/:id").get(protect, fetchSite)
router.route("/fetchSiteHardware/:id").get(protect, fetchSiteHardware)
router.route("/fetchSitesPlywood").get(protect, fetchSitesPlywood)
router.route("/addPlywoodDetails").patch(protect, addPlywoodDetails)
router.route("/fetchPlywoodDetails/:id").get(protect, fetchPlywoodDetails)
router.route("/updateTotal/:id").post(protect, updateTotal)
router.route("/deletePlywood/:id").delete(protect, deletePlywood)
router.route("/editPlywood/:id").patch(protect, editPlywood)

router.route("/fetchSitesHardware").get(protect, fetchSitesHardware)
router.route("/addHardwareDetails").patch(protect, addHardwareDetails)
router.route("/fetchHardwareDetails/:id").get(protect, fetchHardwareDetails)



export default router;