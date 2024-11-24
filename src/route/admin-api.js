import express from "express";
import genreController from "../controller/genre-controller.js";
import {adminMiddleware} from "../middleware/admin-middleware.js";
import animeController from "../controller/anime-controller.js";

const adminRouter = new express.Router();
adminRouter.use(adminMiddleware);
adminRouter.post("/api/genres", genreController.create);
adminRouter.post("/api/animes", animeController.create);

export {
    adminRouter
}