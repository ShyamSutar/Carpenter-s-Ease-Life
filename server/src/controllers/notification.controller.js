import asyncHandler from "express-async-handler";
import Notification from "../models/notification.model.js";
import Attendance from "../models/attendance.model.js";

const notificationRequest = asyncHandler(async (req, res) => {

  const alreadyApproved = await Attendance.findOne({mistry: req.body.mistryId, carpenter: req.user._id})
  
  if(alreadyApproved){
    return res.status(400).json({message: "already approved"})
  }

  const exists = await Notification.findOne({mistry: req.body.mistryId, carpenter: req.user._id});
  if(exists){
    return res.status(400).json({message: "request already sent.!!"})
  }

  const notification = await Notification.create({ mistry: req.body.mistryId, carpenter: req.user._id});
  res.status(200).json({message: "request successfully sent"})
});

const showNotification = asyncHandler(async(req, res)=>{
  const notifications = await Notification.find({mistry:req.user._id}).populate('carpenter')
  res.json(notifications)
})

const rejectNotification = asyncHandler(async(req, res)=>{
  await Notification.findOneAndDelete({mistry: req.user._id, carpenter:req.params.carpenterId});
  res.status(200).json({message: "request rejected successfully"})
})

const approveNotification = asyncHandler(async(req, res)=>{

  await Attendance.create({mistry: req.user._id, carpenter: req.params.carpenterId});
  await Notification.findOneAndDelete({mistry: req.user._id, carpenter: req.params.carpenterId});
  res.status(200).json({message: "request accepted successfully"})
})

export { notificationRequest, approveNotification, showNotification, rejectNotification };
