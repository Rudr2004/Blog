import Joi from "joi";

export const userValidation = Joi.object({
  name: Joi.string().min(2).max(10),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  blogs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
});

export const blogValidation = Joi.object({
  title: Joi.string().min(2).max(20).required(),
  desc: Joi.string().min(10).required(),
  user: Joi.string().required(),
});
