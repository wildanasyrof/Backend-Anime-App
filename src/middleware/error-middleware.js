import {ResponseError} from "../utils/response-error.js";
import multer from "multer";

const errorMiddleware = (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                error: "File size exceeds the 2MB limit.",
            });
        }
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else {
        res.status(500).json({
            errors: err.message
        }).end();
    }
}

export {
    errorMiddleware
}