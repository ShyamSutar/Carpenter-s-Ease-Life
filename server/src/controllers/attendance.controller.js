import asyncHandler from "express-async-handler";
import Attendance from "../models/attendance.model.js";

const showCarpenters = asyncHandler(async (req, res) => {
  const carpenters = await Attendance.find({ mistry: req.user._id }).populate(
    "carpenter"
  );
  res.status(200).json({
    carpenters,
  });
});

const findCarpenterById = asyncHandler(async (req, res) => {
  const carpenter = await Attendance.find({
    mistry: req.user._id,
    carpenter: req.params.id,
  }).populate("carpenter");
  res.status(200).json({ carpenter });
});

const showMistry = asyncHandler(async (req, res) => {
  const mistry = await Attendance.find({ carpenter: req.user._id }).populate(
    "mistry"
  );
  res.status(200).json({ mistry });
});

const findMistryById = asyncHandler(async (req, res) => {
  const mistry = await Attendance.find({
    mistry: req.params.id,
    carpenter: req.user._id,
  }).populate("mistry");
  res.status(200).json({ mistry });
});

export { showCarpenters, findCarpenterById, showMistry, findMistryById };
