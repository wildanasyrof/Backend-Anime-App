import Joi from "joi";

const createUserFavValidation = Joi.object({
    userId: Joi.string().required(),
    animeId: Joi.number().required()
});

const destroyUserFavValidation = Joi.object({
    userId: Joi.string().required(),
    animeId: Joi.number().required()
});

export {
    createUserFavValidation,
    destroyUserFavValidation
}