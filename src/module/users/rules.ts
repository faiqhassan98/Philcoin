import Joi from "joi";

export default {
  updateUser: Joi.object().keys({
    firstName: Joi.string().required(),
  }),
};
