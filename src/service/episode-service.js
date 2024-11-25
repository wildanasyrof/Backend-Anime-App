import {validate} from "../validation/validation.js";
import {createEpisodeValidation} from "../validation/episode-validation.js";
import {ResponseError} from "../utils/response-error.js";
import {prismaClient} from "../app/database.js";

const create = async (request, id) => {
    const animeId = parseInt(id);
    const episode = validate(createEpisodeValidation, request);

    if (!animeId || isNaN(animeId)) {
        throw new ResponseError(400, "Invalid anime id");
    }

    const countEps = await prismaClient.episode.count({
        where: {
            episodeNumber: request.episodeNumber
        }
    });

    if (countEps !== 0) {
        throw new ResponseError(400, "Episode Already Exist, Please use edit feature!");
    }

    episode.animeId = animeId;

    return prismaClient.episode.create({
        data: episode
    });
}

export default {
    create,
}