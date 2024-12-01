import userFavoriteService from "../service/user-favorite-service.js";

const create = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const request = req.body;
        request.userId = userId;
        const result = await userFavoriteService.create(request);
        res.status(200).json({
            message: "Success add anime to Favorite",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const destroy = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const request = req.body;
        request.userId = userId;
        const result = await userFavoriteService.destroy(request);
        res.status(200).json({
            message: "Success delete anime in Favorite",
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    destroy
}