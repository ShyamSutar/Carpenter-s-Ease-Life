import asyncHandler from "express-async-handler";
import Attendance from "../models/attendance.model.js";

const showCarpenters = asyncHandler(async(req, res)=>{
    const carpenters = await Attendance.find({mistry: req.user._id}).populate('carpenter')
    res.status(200).json({
        carpenters
    })
})

export {showCarpenters}