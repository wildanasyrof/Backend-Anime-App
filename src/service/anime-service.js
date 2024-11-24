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

export default {
    create
}