import express from "express";
import { registerUser, loginUser, userProfile, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", verifyJWT ,userProfile);

router.post("/logout", verifyJWT, logoutUser);


export default router;