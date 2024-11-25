import {validate} from "../validation/validation.js";
import {createAnimeValidation, updateAnimeValidation} from "../validation/anime-validation.js";
import {prismaClient} from "../app/database.js";
import {ResponseError} from "../utils/response-error.js";

const create = async (request) => {
    const animeRequest = validate(createAnimeValidation, request);

    const genre = animeRequest.genres.map((genre) => ({
        name: genre,
    }));

    return prismaClient.anime.create({
        data: {
            title: animeRequest.title,
            description: animeRequest.description,
            genres: {
                connect: genre
            },
            imgUrl: animeRequest.imgUrl,
        }
    });
}

const get = async (page = 1, pageSize = 10) => {
    const totalRecords = await prismaClient.anime.count();
    const animes = await prismaClient.anime.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
            id: true,
            title: true,
            description: true,
            genres: {
                select: {
                    name: true,
                }
            },
            imgUrl: true,
            updatedAt: true,
        }
    });

    return {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / pageSize),
        totalRecords,
        listAnime: animes
    }
}

const update = async (request, id) => {
    const animeId = parseInt(id);
    const updateRequest = validate(updateAnimeValidation, request);

    if (isNaN(animeId) || !id) {
        throw new ResponseError(400, "Invalid Anime ID");
    }

    const existingAnime = await prismaClient.anime.findUnique({
        where: { id: animeId },
    });

    if (!existingAnime) {
        throw new ResponseError(404, "Anime ID is not found!");
    }

    const updateData = {};

    if (updateRequest.title) updateData.title = updateRequest.title;
    if (updateRequest.description) updateData.description = updateRequest.description;
    if (updateRequest.imgUrl) updateData.imgUrl = updateRequest.imgUrl;

    if (updateRequest.genres) {
        const genres = updateRequest.genres.map((genre) => ({
            where: { name: genre },
            create: { name: genre },
        }));

        updateData.genres = {
            set: [],
            connectOrCreate: genres,
        };
    }

    return prismaClient.anime.update({
        where: { id: animeId },
        data: updateData,
    });
};


const destroy = async (id) => {
    const animeId = parseInt(id);

    if (!animeId || isNaN(animeId)) {
        throw new ResponseError(400, "Invalid anime ID");
    }

    const countAnime = await prismaClient.anime.count({
        where: {
            id: animeId,
        }
    });

    if (countAnime !== 1) {
        throw new ResponseError(404, "Anime is not found!");
    }

    return prismaClient.anime.delete({
        where: {
            id: animeId
        }
    })
}

export default {
    create,
    get,
    update,
    destroy
}