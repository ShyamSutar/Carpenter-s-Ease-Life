import { Router } from "express";
import { register, login, getUser, logout, mistrySearch } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);

//secured routes
router.route('/getUser').get(protect, getUser);
router.route('/logout').post(protect, logout);

router.route('/mistrySearch').post(protect, mistrySearch);

export default router;