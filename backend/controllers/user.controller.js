import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateAuthToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const authToken = user.generateAuthToken();
    return authToken;
  } catch (error) {
    throw new ApiError(500,
      "Something went wrong while generating auth token");
  }
}

const registerUser = asyncHandler(async (req, res, next) => {
  const { fullname: {firstname, lastname}, email, password } = req.body;

  console.log(req.body);

  if (!firstname || !email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }

   const existingUser = await User.findOne({ email });

   if (existingUser) {
    throw new ApiError(400, "User already exists");
    }

   const user = await User.create({
    fullname: {firstname, lastname},
    email,
    password
   })

   console.log(user);

  //  const createdUser = await User.findById(user._id).select('-password');

   if (!user) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  const token = await generateAuthToken(user._id);

  return res
    .status(201)
    .json(new ApiResponse(200, {user, token}, "User registered Successfully"));

});

const loginUser = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = await generateAuthToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, {user, token}, "User logged in Successfully"));
})

const userProfile = asyncHandler(async (req, res, next) => {
  
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // console.log(user);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});


const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});





export {registerUser, loginUser, userProfile, logoutUser};