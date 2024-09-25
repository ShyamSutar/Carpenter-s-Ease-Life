import asyncHandler from "express-async-handler";
import Slip from "../models/slip.model.js";

const addSlip = asyncHandler(async (req, res) => {
  const carpenter = req.params.id;
  const mistry = req.user._id;
  const { totalAmount, totalAdvance, totalAttendance } = req.body;

  await Slip.create({
    carpenter,
    mistry,
    totalAmount,
    totalAdvance,
    totalAttendance,
  });

  res.status(200).json({ message: "successfully payed" });
});

const showSlipMistry = asyncHandler(async (req, res) => {
  
  const slips = await Slip.find({mistry: req.user._id}).populate("carpenter").sort({createdAt: -1})

  res.status(200).json(slips);
});

const showSlipCarpenter = asyncHandler(async (req, res) => {
  
  const slips = await Slip.find({carpenter: req.user._id}).populate("mistry").sort({createdAt: -1})

  res.status(200).json(slips);
});

export { addSlip, showSlipMistry, showSlipCarpenter };
