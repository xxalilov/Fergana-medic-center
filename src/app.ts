import * as path from "path";
import {join} from "path";
import express, { json, static as static_ } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import { errorHandler } from "./middlewares/error-handler";
import { asyncHandler } from "./middlewares/async";
import { NotFoundError } from "./errors/not-found-error";

// Routes
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import { categoryRoutes } from "./routes/category";
import { soreRoutes } from "./routes/sore";
import { reservationRoutes } from "./routes/reservation";
import { roomRoutes } from "./routes/room";

const app = express();

// Set security helmet
app.use(helmet());

// Prevent http param pollution
app.use(hpp());

app.use(cors());

app.use(json());
app.use(cookieParser());

app.use(compression());

// Files folder
app.use(
  "/static/uploads",
  express.static(path.join(__dirname, "../", "static", "uploads"))
);

app.use(static_(join(__dirname, "../client/build")));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/sore", soreRoutes);
app.use("/api/v1/reservation", reservationRoutes);
app.use("/api/v1/room", roomRoutes);
app.get("*", (req, res, next) => {
    res.sendFile(join(__dirname, "../client/build/index.html"), (err) => {
        next();
    });
});
app.all(
  "*",
  asyncHandler(async () => {
    throw new NotFoundError("Route Not Found.");
  })
);
app.use(errorHandler);

export default app;
