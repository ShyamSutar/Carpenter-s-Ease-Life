import asyncHandler from "express-async-handler";
import Calendar from "../models/calendar.model.js";

const postEvent = asyncHandler(async(req, res)=>{
    const mistry = req.user._id
    const{carpenter, date, start, end, title} = req.body;

    await Calendar.create({mistry, carpenter, date, start, end, title})

    res.status(200).json({message: "successfully applied"})
})

const getEvents = asyncHandler(async(req, res)=>{
    const events = await Calendar.find({mistry: req.user._id, carpenter: req.params.id});
    console.log(events);
    res.status(200).json(events)
})

export {postEvent, getEvents}