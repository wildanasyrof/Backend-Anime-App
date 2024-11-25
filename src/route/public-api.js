import express from 'express';
import userController from "../controller/user-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";
import animeController from "../controller/anime-controller.js";

const publicRouter = new express.Router();

// User Routes
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);
publicRouter.patch("/api/users/update", authMiddleware, userController.update);

// Anime Routes
publicRouter.get("/api/animes", animeController.get);

export {
    publicRouter
}