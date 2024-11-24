import express from "express";
import genreController from "../controller/genre-controller.js";
import {adminMiddleware} from "../middleware/admin-middleware.js";
import animeController from "../controller/anime-controller.js";

const adminRouter = new express.Router();
adminRouter.use(adminMiddleware);

//Genre Routes
adminRouter.get("/api/genres", genreController.get);
adminRouter.post("/api/genres", genreController.create);
adminRouter.delete("/api/genres/:id", genreController.destroy);

// Anime Routes
adminRouter.post("/api/animes", animeController.create);
adminRouter.delete("/api/animes/:id", animeController.destroy);

export {
    adminRouter
}