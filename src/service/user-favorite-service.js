import {validate} from "../validation/validation.js";
import {createUserFavValidation, destroyUserFavValidation} from "../validation/user-favorite-validation.js";
import {prismaClient} from "../app/database.js";
import {ResponseError} from "../utils/response-error.js";

const create = async (request) => {
    const userFavorite = validate(createUserFavValidation, request);

    const anime = await prismaClient.anime.findUnique({
        where: {
            id: userFavorite.animeId
        }
    });

    if (!anime) {
        throw new ResponseError(404, "anime not found!");
    }

    const countAnime = await prismaClient.userFavorite.count({
        where: {
            userId: userFavorite.userId,
            animeId: userFavorite.animeId
        }
    });

    if (countAnime !== 0) {
        throw new ResponseError(400, "Anime Already in Favorite.");
    }

    return prismaClient.userFavorite.create({
        data: userFavorite,
        include: {
            anime: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                }
            }
        }
    });
}

const destroy = async (request) => {
    const userFavorite = validate(destroyUserFavValidation, request);

    const anime = await prismaClient.userFavorite.findFirst({
        where: {
            userId: userFavorite.userId,
            animeId: userFavorite.animeId
        }
    });

    if (!anime) {
        throw new ResponseError(404, "Anime not found!");
    }

    return prismaClient.userFavorite.delete({
        where: {
            id: anime.id
        },
        include: {
            anime: {
                select: {
                    title: true,
                    description: true,
                }
            }
        }
    });
}

export default {
    create,
    destroy
}