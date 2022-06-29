const joi = require("@hapi/joi");

module.exports.userRegisterValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().min(3).required().email(),
    password: joi.string().min(8).required(),
  });

  return schema.validate(data);
};

module.exports.userEditValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).allow(""),
    email: joi.string().min(3).email().allow(""),
    password: joi.string().min(3).allow("").min(8),
  });

  return schema.validate(data);
};
