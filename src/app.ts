import * as path from "path";
import express, {json} from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import {errorHandler} from "./middlewares/error-handler";
import {asyncHandler} from "./middlewares/async";
import {NotFoundError} from "./errors/not-found-error";

// Routes
import {authRoutes} from "./routes/auth";
import {userRoutes} from "./routes/user";
import {categoryRoutes} from "./routes/category";
import {soreRoutes} from "./routes/sore";

const app = express();

app.use(cors())

app.use(json());
app.use(cookieParser())

// Files folder
app.use(
    '/static/uploads',
    express.static(path.join(__dirname, '../', 'static', 'uploads')),
);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/sore', soreRoutes);
app.all("*", asyncHandler(async () => {
    throw new NotFoundError("Route Not Found.")
}))
app.use(errorHandler);

export default app;