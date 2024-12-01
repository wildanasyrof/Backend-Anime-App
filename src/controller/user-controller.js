import userService from "../service/user-service.js";
import * as fs from "node:fs";
import {logger} from "../app/logging.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            message: "User registered successfully",
            data: result
        });
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            message: "User logged in successfully",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const request = req.body;
        request.id = userId;
        request.imgUrl = req.file.path;
        const result = await userService.update(request);
        res.status(201).json({
            message: "User updated successfully",
            data: result
        })
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

export default {
    register,
    login,
    update
}