import Joi from "joi";

const createEpisodeValidation = Joi.object({
    episodeNumber: Joi.number().required(),
    title: Joi.string().max(100),
    description: Joi.string().max(255),
    videoUrl: Joi.string().required()
});

export { createEpisodeValidation };