import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.use("/src", express.static("src", { extensions: ["css"] }));

import userRoutes from "./routes/user.routes.js";
import captianRoutes from "./routes/captian.routes.js";
import mapsRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/captian", captianRoutes);
app.use("/api/v1/maps", mapsRoutes);
app.use("/api/v1/rides", rideRoutes);
app.use("/api/v1/payments", paymentRoutes);

export { app };
