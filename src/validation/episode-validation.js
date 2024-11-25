import Joi from "joi";

const createEpisodeValidation = Joi.object({
    animeId: Joi.number().required(),
    episodeNumber: Joi.number().required(),
    title: Joi.string().max(100),
    description: Joi.string().max(255),
    videoUrl: Joi.string().required()
});

const updateEpisodeValidation = Joi.object({
    episodeNumber: Joi.number(),
    title: Joi.string().max(100),
    description: Joi.string().max(255),
    videoUrl: Joi.string()
});

export {
    createEpisodeValidation,
    updateEpisodeValidation
};