import {validate} from "../validation/validation.js";
import {createEpisodeValidation, updateEpisodeValidation} from "../validation/episode-validation.js";
import {ResponseError} from "../utils/response-error.js";
import {prismaClient} from "../app/database.js";

const create = async (request) => {
    const episode = validate(createEpisodeValidation, request);

    const animeExist = await prismaClient.anime.findUnique({
        where: {
            id: episode.animeId
        }
    })

    if (!animeExist) {
        throw new ResponseError(404, "Anime ID is not found!");
    }

    const countEps = await prismaClient.episode.count({
        where: {
            episodeNumber: request.episodeNumber
        }
    });

    if (countEps !== 0) {
        throw new ResponseError(400, "Episode Already Exist, Please use edit feature!");
    }

    return prismaClient.episode.create({
        data: episode
    });
}

const update = async (request, id) => {
    const epsId = parseInt(id);
    const episode = validate(updateEpisodeValidation, request);

    if (!epsId || isNaN(epsId)) {
        throw new ResponseError(400, "Invalid episode ID");
    }

    const countEps = await prismaClient.episode.findUnique({
        where: {
            id: epsId
        }
    });

    if (!countEps) {
        throw new ResponseError(404, "Episode ID is not found!");
    }

    const epsNumber = await prismaClient.episode.count({
        where: {
            episodeNumber: episode.episodeNumber,
            NOT: {
                id: epsId
            }
        }
    });

    if (epsNumber !== 0) {
        throw new ResponseError(400, "Episode Already Exist, Please use edit feature!");
    }

    return prismaClient.episode.update({
        where: {
            id: epsId,
        },
        data: episode
    });
}

const destroy = async (id) => {
    const epsId = parseInt(id);
    if (!epsId || isNaN(epsId)) {
        throw new ResponseError(400, "Invalid episode ID");
    }

    const countEps = await prismaClient.episode.findUnique({
        where: {
            id: epsId
        }
    });

    if (!countEps) {
        throw new ResponseError(404, "Episode ID is not found!");
    }

    return prismaClient.episode.delete({
        where: {
            id: epsId
        }
    });
}

export default {
    create,
    update,
    destroy
}