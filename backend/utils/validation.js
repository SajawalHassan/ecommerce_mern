const joi = require("@hapi/joi");

module.exports.userRegisterValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().min(3).required().email(),
    password: joi.string().min(3).required(),
  });

  return schema.validate(data);
};
