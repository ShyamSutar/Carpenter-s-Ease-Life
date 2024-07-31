import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

const register = asyncHandler(async (req, res) => {
  const { username, email, phone, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({ username, email, phone, password, role });

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
    res.status(201).json({
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
  const mistry = await User.find({username:req.body.username, role: "mistry" }).select("-password");
  res.status(200).json(mistry);
});



export { register, login, getUser, logout, mistrySearch };
