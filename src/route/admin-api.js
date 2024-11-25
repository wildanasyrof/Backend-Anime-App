import express from "express";
import genreController from "../controller/genre-controller.js";
import {adminMiddleware} from "../middleware/admin-middleware.js";
import animeController from "../controller/anime-controller.js";
import episodeController from "../controller/episode-controller.js";
import {multerUpload} from "../utils/file-upload.js";

const adminRouter = new express.Router();
adminRouter.use(adminMiddleware);

//Genre Routes
adminRouter.get("/api/genres", genreController.get);
adminRouter.post("/api/genres", genreController.create);
adminRouter.put("/api/genres/:id", genreController.update);
adminRouter.delete("/api/genres/:id", genreController.destroy);

// Anime Routes
adminRouter.post("/api/animes", multerUpload.single("file"), animeController.create);
adminRouter.put("/api/animes/:id", multerUpload.single("file"), animeController.update);
adminRouter.delete("/api/animes/:id", animeController.destroy);

// Episode Routes
adminRouter.post("/api/episodes", episodeController.create);
adminRouter.put("/api/episodes/:epsId", episodeController.update);
adminRouter.delete("/api/episodes/:epsId", episodeController.destroy);

export {
    adminRouter
}