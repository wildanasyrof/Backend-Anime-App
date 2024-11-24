import Joi from "joi";

const genreValidation = Joi.object({
    name: Joi.string().max(50).required()
});

export { genreValidation };