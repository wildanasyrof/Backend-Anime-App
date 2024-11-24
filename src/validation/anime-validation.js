import Joi from "joi";

const createAnimeValidation = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().required(),
    genres: Joi.array().items(Joi.string().max(50)).required(), // Array of strings
    imgUrl: Joi.string(),
});

export {
    createAnimeValidation
}