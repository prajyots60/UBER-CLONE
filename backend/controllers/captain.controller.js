import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Captain } from "../models/captain.model.js";


const registerCaptain = asyncHandler(async (req, res) => {
    const {fullname: {firstname, lastname}, email, password, vehicle: {color, plate, capacity, vehicleType} } = req.body;

    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new ApiError(400, "Please provide all required fields");
    }

    const existingCaptain = await Captain.findOne({ email });

    if (existingCaptain) {
        throw new ApiError(400, "Captain already exists");
    }

    const captain = await Captain.create({
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType
      }
    })

    if (!captain) {
        throw new ApiError(500, "Something went wrong while registering the captain");
    }

    const token = await captain.generateAuthToken();

   return res
      .status(201)
      .json(new ApiResponse(201,{ captain, token }, "Captain registered successfully"));
})

const loginCaptain = asyncHandler(async(req, res) => {

   const {email, password} = req.body;

   if(!email || !password){
    throw new ApiError(400, "Please provide all fields")
   }

   const captain = await Captain.findOne({email}).select('+password');

   if(!captain){
    throw new ApiError(404, "Captain not found");
   }

   const isMatch = await captain.comparePassword(password);

   if(!isMatch){
    throw new ApiError(401, "Invalid credentials , password");
   }

   const token = await captain.generateAuthToken();

   const options = {
     httpOnly: true,
     secure: true
   }

   return res
     .status(200)
     .cookie("token", token, options)
     .json(new ApiResponse(200, { captain, token }, "Captain logged in successfully"));
})


const captainProfile = asyncHandler(async (req, res) => {
  const captain = await Captain.findById(req.captain?._id);

  if(!captain){
    throw new ApiError(404, "Captain not found");
  }

  return res
            .status(200)
            .json(new ApiResponse(200, captain, "Captain profile fetched successfully"))
})


const logoutCaptain = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  return res
    .status(200)
    .json (new ApiResponse(200, {}, "Captain logged out successfully"));
})


export {registerCaptain, loginCaptain, captainProfile, logoutCaptain};