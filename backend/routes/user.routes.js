import express from "express";
import { registerUser, loginUser, userProfile, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/register", asyncHandler(registerUser));

router.post("/login", asyncHandler(loginUser ));

router.get("/profile", verifyJWT ,asyncHandler(userProfile));

router.post("/logout", verifyJWT, asyncHandler(logoutUser ));


export default router;