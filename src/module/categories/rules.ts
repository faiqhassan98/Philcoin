import Joi from "joi";

export default {
  createCategory: Joi.object().keys({
    name: Joi.string().required(),
  }),
  updateCategory: Joi.object().keys({
    name: Joi.string().required(),
  }),
};
