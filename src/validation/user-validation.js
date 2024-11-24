import Joi from "joi";

const registerUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().min(8).required(),
});

const loginUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
});

const updateUserValidation = Joi.object({
    id: Joi.string().max(100).required(),
    username: Joi.string().max(100).min(8),
    name: Joi.string().max(100),
    email: Joi.string().max(100),
    password: Joi.string().min(8),
    imgUrl: Joi.string().max(255)
});

export {
    registerUserValidation,
    loginUserValidation,
    updateUserValidation,
}