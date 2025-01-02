import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());



//Routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);



export default app;