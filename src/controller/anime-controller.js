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

export default {
    create
}