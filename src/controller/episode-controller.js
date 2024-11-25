import episodeService from "../service/episode-service.js";

const create = async (req, res, next) => {
    try {
        const result = await episodeService.create(req.body);
        res.status(200).json({
            message: 'Successfully created episode',
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const { epsId } = req.params;
        const result = await episodeService.update(req.body, epsId);
        res.status(200).json({
            message: `Successfully update episode with ID ${epsId}`,
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const destroy = async (req, res, next) => {
    try {
        const { epsId } = req.params;
        const result = await episodeService.destroy(epsId)
        res.status(200).json({
            message: 'Successfully delete episode.',
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    update,
    destroy
}