import {validate} from "../validation/validation.js";
import {createAnimeValidation} from "../validation/anime-validation.js";
import {prismaClient} from "../app/database.js";

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
        animeData: animes
    }
}

export default {
    create,
    get
}