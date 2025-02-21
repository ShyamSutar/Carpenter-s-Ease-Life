import { Router } from "express";
import { register, login, getUser, logout, mistrySearch, updatePay, totalAmount, plywoodSearch, hardwareSearch, clientSearch, updateUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);

//secured routes
router.route('/getUser').get(protect, getUser);
router.route('/logout').post(protect, logout);

router.route('/mistrySearch').post(protect, mistrySearch);
router.route('/plywoodSearch').post(protect, plywoodSearch);
router.route('/hardwareSearch').post(protect, hardwareSearch);
router.route('/clientSearch').post(protect, clientSearch);

router.route('/updatePay/:id').patch(protect, updatePay);

router.route('/totalAmount/:id').patch(protect, totalAmount)

router.route('/updateUser/:id').patch(protect, updateUser)


export default router;