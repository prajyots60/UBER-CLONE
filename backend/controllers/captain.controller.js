import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Captain } from "../models/captain.model.js";


const registerCaptain = asyncHandler(async (req, res, next) => {
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

    res
      .status(200)
      .json(new ApiResponse(200,{ captain, token }, "Captain registered successfully"));
})


export {registerCaptain};