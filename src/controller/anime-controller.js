import animeService from "../service/anime-service.js";

const create = async (req, res, next) => {
    try {
        const result = await animeService.create(req.body);
        res.status(200).json({
            message: `Successfully created anime`,
            data: result
        });
    } catch (e) {
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

export default {
    create,
    get,
    destroy
}