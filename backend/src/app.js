import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.use("/src", express.static("src", { extensions: ["css"] }));
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";
import captianRoutes from "./routes/captian.routes.js";
import mapsRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/captian", captianRoutes);
app.use("/api/v1/maps", mapsRoutes);
app.use("/api/v1/rides", rideRoutes);

export { app };
