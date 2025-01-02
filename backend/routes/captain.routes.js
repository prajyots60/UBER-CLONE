import express from "express";
import { registerCaptain, loginCaptain, captainProfile, logoutCaptain } from "../controllers/captain.controller.js";
import { verifyCaptain } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerCaptain);
router.post("/login", loginCaptain);
router.get("/profile", verifyCaptain, captainProfile);
router.post("/logout", verifyCaptain, logoutCaptain);

export default router;