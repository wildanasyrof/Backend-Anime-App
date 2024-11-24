import {validate} from "../validation/validation.js";
import {genreValidation} from "../validation/genre-validation.js";
import {prismaClient} from "../app/database.js";
import {ResponseError} from "../utils/response-error.js";

const create = async (request) => {
    const genre = validate(genreValidation, request);

    const countGenre = await prismaClient.genre.count({
        where: {
            name: genre.name
        }
    });

    if (countGenre !== 0) {
        throw new ResponseError(400, "Genre already exist");
    }

    return prismaClient.genre.create({
        data: genre,
        select: {
            name: true
        }
    });
}

const get = async () => {
    return prismaClient.genre.findMany()
}

export default {
    create,
    get
}