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

})





export {registerUser}