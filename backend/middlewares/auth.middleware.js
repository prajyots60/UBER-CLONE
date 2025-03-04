import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Captain } from "../models/captain.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {

  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
  
    if(!token){
      throw new ApiError(401, "Unauthorized request");
    }
  
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await User.findById(decodedToken._id);

    // console.log(user);
  
    if(!user){
      throw new ApiError(401, "Invalid token");
    }
  
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth middleware" , error);
    throw new ApiError(401, "Invalid token");
  }

})

export const verifyCaptain = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await Captain.findById(decodedToken._id);

    if(!captain){
      throw new ApiError(401, "Invalid token");
    }

    req.captain = captain;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
})