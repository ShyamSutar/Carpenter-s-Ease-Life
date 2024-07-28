import { Router } from "express";

const router = Router();

router.route('/').get((req, res)=>{
    res.send("hello world");
});

export default router;