import animeService from "../service/anime-service.js";
import fs from "node:fs";
import {logger} from "../app/logging.js";

const create = async (req, res, next) => {
    try {
        req.body.imgUrl = req.file.path;
        const result = await animeService.create(req.body);
        res.status(200).json({
            message: `Successfully created anime`,
            data: result
        });
    } catch (e) {
        const uploadedFilePath = req.file.path;
        fs.unlink(uploadedFilePath, (err) => {
            if (err) {
                logger.error('Failed to delete uploaded file:', err);
            }
        });
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const { page = "1", pageSize = "10" } = req.query;
        const result = await animeService.get(parseInt(page), parseInt(pageSize));
        res.status(200).json({
            message: "Successfully get anime",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (req.file) {
            req.body.imgUrl = req.file.path;
        }
        const result = await animeService.update(req.body, id);
        res.status(200).json({
            message: `Successfully updated anime with id ${id}.`,
            data: result
        });
    } catch (e) {
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    logger.error('Failed to delete uploaded file:', err);
                }
            });
        }
        next(e);
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await animeService.destroy(id);
        res.status(200).json({
            message: `Successfully delete anime with id ${id}.`,
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const detailAnime = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await animeService.detailAnime(id);
        res.status(200).json({
            message: `Successfully get detail anime with id ${id}.`,
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    destroy,
    detailAnime
}