import asyncHandler from "express-async-handler";
import Calendar from "../models/calendar.model.js";

const postEvent = asyncHandler(async(req, res)=>{
    const mistry = req.user._id
    const{carpenter, date, start, end, title} = req.body;
    const advance = req.body.advance || 0;

    await Calendar.create({mistry, carpenter, date, start, end, title, advance})

    res.status(200).json({message: "successfully applied"})
})

const updateEvent = asyncHandler(async(req, res)=>{
    const {id} = req.params
    const mistry = req.user._id
    const{carpenter, date, start, end, title, advance} = req.body;

    const event = await Calendar.findById(id);

    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }

    event.mistry = mistry || event.mistry;
    event.carpenter = carpenter || event.carpenter;
    event.date = date || event.date;
    event.start = start || event.start;
    event.end = end || event.end;
    event.title = title || event.title;
    event.advance = advance || event.advance;

    await event.save();

    res.status(200).json({message: "successfully updated"})
})

const getEvents = asyncHandler(async(req, res)=>{
    const events = await Calendar.find({mistry: req.user._id, carpenter: req.params.id});
    res.status(200).json(events)
})

const getEvents2 = asyncHandler(async(req, res)=>{
    const events = await Calendar.find({carpenter: req.user._id, mistry: req.params.id});
    res.status(200).json(events)
})

const deleteAllCalendar = asyncHandler(async (req, res) => {
    await Calendar.deleteMany({mistry: req.body.mistryId, carpenter: req.params.id})
    res.status(200).json({message: "carpenter removed successfully"});
  });

export {postEvent, getEvents, updateEvent, getEvents2, deleteAllCalendar}