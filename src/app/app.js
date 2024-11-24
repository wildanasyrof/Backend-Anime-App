import express from "express";
import {publicRouter} from "../route/public-api.js";
import {errorMiddleware} from "../middleware/error-middleware.js";
import {adminRouter} from "../route/admin-api.js";

export const app = express();

app.use(express.json());
app.use(publicRouter);
app.use(adminRouter);
app.use(errorMiddleware);