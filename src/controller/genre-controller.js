import genreService from "../service/genre-service.js";

const create = async (req, res, next) => {
    try {
        const result = await genreService.create(req.body);
        res.status(200).json({
            message: 'Success create genre',
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const result = await genreService.get();
        res.status(200).json({
            message: "Success getting genre",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get
}