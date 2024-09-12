import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

const register = asyncHandler(async (req, res) => {
  let pay;
  const { username, email, phone, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  if (role === "carpenter") {
    pay = 600;
  }

  const user = await User.create({
    username,
    email,
    phone,
    password,
    role,
    pay,
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
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

//mistry search by carpenter
const mistrySearch = asyncHandler(async (req, res) => {
  const mistry = await User.find({
    username: req.body.username,
    role: "mistry",
  }).select("-password");
  res.status(200).json(mistry);
});

const updatePay = asyncHandler(async (req, res) => {
  const {id} = req.params
  const pay  = req.body;

  const updateUser = await User.findByIdAndUpdate(req.params.id, pay, { new: true });
  
  if (!updateUser) return res.status(404).send("User not found");

  res.status(200).json({ message: "successfully updated" });
});

const totalAmount = asyncHandler(async (req, res) => {
  const {id} = req.params
  
  const user = await User.findById(id);
  if(!user){
    throw new Error("user not found")
  }
  user.totalAmount = req.body.totalAmount;
  await user.save();

  res.status(200).json({ message: "successfully updated" });
});

export { register, login, getUser, logout, mistrySearch, updatePay, totalAmount };
