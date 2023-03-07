import Joi from "joi";

export default {
  register: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    refCode: Joi.string()

  }),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
