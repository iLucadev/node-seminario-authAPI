import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

// Import routes
import indexRoutes from "./routes/index.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Initialize app
const app = express();

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", indexRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
