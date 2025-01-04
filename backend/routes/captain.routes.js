import express from "express";
import { registerCaptain, loginCaptain, captainProfile, logoutCaptain } from "../controllers/captain.controller.js";
import { verifyCaptain } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/register", asyncHandler(registerCaptain));
router.post("/login", asyncHandler(loginCaptain));
router.get("/profile", verifyCaptain, asyncHandler(captainProfile));
router.post("/logout", verifyCaptain, asyncHandler(logoutCaptain));

export default router;