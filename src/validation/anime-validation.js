import Joi from "joi";

const createAnimeValidation = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().required(),
    genres: Joi.array().items(Joi.string().max(50)).required(), // Array of strings
    imgUrl: Joi.string(),
});

const updateAnimeValidation = Joi.object({
    title: Joi.string().max(100),
    description: Joi.string(),
    genres: Joi.array().items(Joi.string().max(50)), // Array of strings
    imgUrl: Joi.string(),
});

export {
    createAnimeValidation,
    updateAnimeValidation
}