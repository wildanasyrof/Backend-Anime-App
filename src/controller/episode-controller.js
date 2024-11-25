import episodeService from "../service/episode-service.js";

const create = async (req, res, next) => {
    try {
        const {animeId} = req.params;
        const result = await episodeService.create(req.body, animeId);
        res.status(200).json({
            message: 'Successfully created episode',
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create
}