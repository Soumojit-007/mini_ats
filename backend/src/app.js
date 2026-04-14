import express from "express";
import cors from "cors";
import matchRoutes from "./routes/matchRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(cors({
    origin: "*"
}));
app.use(express.json());

// Routes
app.use("/api", matchRoutes);

// Error Handler
app.use(errorHandler);

export default app;