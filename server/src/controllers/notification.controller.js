import asyncHandler from "express-async-handler";
import Notification from "../models/notification.model.js";
import Attendance from "../models/attendance.model.js";
import Site from "../models/site.model.js";

const notificationRequest = asyncHandler(async (req, res) => {

  const alreadyApproved = await Attendance.findOne({mistry: req.body.mistryId, carpenter: req.user._id})
  
  if(alreadyApproved){
    return res.status(400).json({message: "already approved"})
  }

  const exists = await Notification.findOne({role: "carpenter", mistry: req.body.mistryId, carpenter: req.user._id});
  if(exists){
    return res.status(400).json({message: "request already sent.!!"})
  }

  const notification = await Notification.create({role: "carpenter", mistry: req.body.mistryId, carpenter: req.user._id});
  res.status(200).json({message: "request successfully sent"})
});

const notificationRequestPlywood = asyncHandler(async(req, res)=>{
  
  const alreadyApproved = await Site.findOne({siteName: req.body.site, mistry: req.user._id, "plywood.plywood": req.body.plywoodId})
  
  if(alreadyApproved){
    return res.status(400).json({message: "already approved"})
  }

  const exists = await Notification.findOne({site: req.body.site, role: "plywood", mistry: req.user._id, plywood: req.body.plywoodId});
  if(exists){
    return res.status(400).json({message: "request already sent.!!"})
  }

  const notification = await Notification.create({site: req.body.site, role: "plywood", mistry: req.user._id, plywood: req.body.plywoodId});
  res.status(200).json({message: "request successfully sent"})
})

const showNotification = asyncHandler(async(req, res)=>{
  const notifications = await Notification.find({role: "carpenter", mistry:req.user._id}).populate('carpenter')
  res.json(notifications)
})

const showNotificationPlywood = asyncHandler(async(req, res)=>{
  const notifications = await Notification.find({role: "plywood", plywood:req.user._id}).populate('mistry')
  res.json(notifications)
})

const rejectNotification = asyncHandler(async(req, res)=>{
  await Notification.findOneAndDelete({role: "carpenter", mistry: req.user._id, carpenter:req.params.carpenterId});
  res.status(200).json({message: "request rejected successfully"})
})

const rejectNotificationPlywood = asyncHandler(async(req, res)=>{
  await Notification.findOneAndDelete({site: req.params.site, role: "plywood", plywood: req.user._id, mistry:req.params.mistryId});
  res.status(200).json({message: "request rejected successfully"})
})

const approveNotification = asyncHandler(async(req, res)=>{

  await Attendance.create({mistry: req.user._id, carpenter: req.params.carpenterId});
  await Notification.findOneAndDelete({role: "carpenter", mistry: req.user._id, carpenter: req.params.carpenterId});
  res.status(200).json({message: "request accepted successfully"})
})

const approveNotificationPlywood = asyncHandler(async(req, res)=>{

  const site = await Site.findOne({siteName: req.params.site, mistry: req.params.mistryId});
  
  const addPlywoodDetails = await Site.findByIdAndUpdate(
    site._id,
    {
      $push: {
        plywood: {
          plywood: req.user._id
        }
      }
    },
    {new: true}
  )

  await Notification.findOneAndDelete({site: req.params.site ,role: "plywood", plywood: req.user._id, mistry: req.params.mistryId});
  res.status(200).json({message: "request accepted successfully"})
})

export { notificationRequest, approveNotification, showNotification, rejectNotification, notificationRequestPlywood, showNotificationPlywood, rejectNotificationPlywood, approveNotificationPlywood };
