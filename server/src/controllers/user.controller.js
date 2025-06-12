import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Attendance from "../models/attendance.model.js";
import Notification from "../models/notification.model.js";
import Site from "../models/site.model.js";
import Calendar from "../models/calendar.model.js";
import Slip from "../models/slip.model.js";

const register = asyncHandler(async (req, res) => {
  let pay;
  const { username, email, phone, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    phone,
    password,
    role,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid User Data");
  }

  res.status(201).json({
    message: "user registerred successfully",
    user: {
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    user.generateToken(res);
    res.status(200).json({
      message: "user loggedin successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.username,
    email: req.user.email,
    phone: req.user.phone,
    role: req.user.role,
  };
  res.status(200).json(user);
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV==="production" ? "none" : "strict",
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

//mistry search by carpenter
const mistrySearch = asyncHandler(async (req, res) => {
  const keyword = req.body.username || "";
  const mistry = await User.find({
    username: { $regex: keyword, $options: "i" },
    role: "mistry",
  }).select("-password");
  res.status(200).json(mistry);
});

const plywoodSearch = asyncHandler(async (req, res) => {
  const plywood = await User.find({
    username: req.body.username,
    role: "plywood",
  }).select("-password");
  res.status(200).json(plywood);
});

const hardwareSearch = asyncHandler(async (req, res) => {
  const plywood = await User.find({
    username: req.body.username,
    role: "hardware",
  }).select("-password");
  res.status(200).json(plywood);
});

const clientSearch = asyncHandler(async (req, res) => {
  const client = await User.find({
    username: req.body.username,
    role: "client",
  }).select("-password");
  res.status(200).json(client);
});

const updatePay = asyncHandler(async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, {
    $set: {
      [`totalAmount.${req.user._id}`]: req.body.totalAmount,
      [`pay.${req.user._id}`]: req.body.pay
    },
  });

  if (!updateUser) return res.status(404).send("User not found");

  // res.status(200).json(updateUser);
  res.status(200).json({ message: "successfully updated" });
});

const totalAmount = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    throw new Error("user not found");
  }
  user.totalAmount = req.body.totalAmount;
  await user.save();

  res.status(200).json({ message: "successfully updated" });
});


const updateUser = asyncHandler(async (req, res) => {
  
  const {name, phone} = req.body
  const updatedUser = await User.updateOne({_id: req.user._id}, {
    $set: {
      username: name, 
      phone: phone
    },
  });

  if (!updatedUser) return res.status(404).json({message: "User not found"});

  res.status(200).json({ message: "successfully updated" });
});

const changePassword = asyncHandler(async (req, res) => {
  
  const {oldPassword, newPassword} = req.body
  const user = await User.findById({_id: req.user._id});

  if (!user) return res.status(404).json({message: "User not found"});

  const checkPassword = await user.comparePassword(oldPassword)

  if(!checkPassword) return res.status(404).json({message: "Old password is incorrect"});

  user.password = newPassword;

  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;


  const user = await User.findById({_id: userId});
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Delete user from the User collection
  await User.findByIdAndDelete({_id: userId});

  // Remove user from related models
  await Attendance.deleteMany({ $or: [{ mistry: userId }, { carpenter: userId }] });
  await Calendar.deleteMany({ $or: [{ mistry: userId }, { carpenter: userId }] });
  await Notification.deleteMany({ 
    $or: [{ mistry: userId }, { carpenter: userId }, { plywood: userId }, { hardware: userId }, { client: userId }]
  });
  await Site.deleteMany({ mistry: userId });
  await Slip.deleteMany({ $or: [{ mistry: userId }, { carpenter: userId }] });

  res.status(200).json({ message: "User and all related data deleted successfully" });
});


export {
  register,
  login,
  getUser,
  logout,
  mistrySearch,
  updatePay,
  totalAmount,
  plywoodSearch,
  hardwareSearch,
  clientSearch,
  updateUser,
  changePassword,
  deleteUser,
};
