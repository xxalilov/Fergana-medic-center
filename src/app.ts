import * as path from "path";
import express, {json} from 'express';
import cookieParser from "cookie-parser";
import {errorHandler} from "./middlewares/error-handler";
import {asyncHandler} from "./middlewares/async";
import {NotFoundError} from "./errors/not-found-error";
import {authRoutes} from "./routes/auth";

const app = express();

app.use(json());
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes);
app.all("*", asyncHandler(async () => {
    throw new NotFoundError("Route Not Found.")
}))
app.use(errorHandler);

export default app;