import express from 'express';
import userController from "../controller/user-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";
import animeController from "../controller/anime-controller.js";
import {multerUpload} from "../utils/file-upload.js";
import userFavoriteController from "../controller/user-favorite-controller.js";

const publicRouter = new express.Router();

// User Routes
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);
publicRouter.patch("/api/users/update", multerUpload.single("file"), authMiddleware, userController.update);

// Anime Routes
publicRouter.get("/api/animes", animeController.get);
publicRouter.get("/api/animes/:id", animeController.detailAnime);

// Favorite Routes
publicRouter.post("/api/favorites/", authMiddleware, userFavoriteController.create);
publicRouter.delete("/api/favorites/", authMiddleware, userFavoriteController.destroy);

export {
    publicRouter
}