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


// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message: message,
  });
});



export default app;