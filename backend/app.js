import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());



//Routes
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/captains", captainRoutes);



export default app;