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

module.exports.createProductValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required().min(3),
    description: joi.string().required().min(10),
    images: joi.array().required().min(1),
    shipsTo: joi.array().required().min(1),
    price: joi.number().required(),
    inStock: joi.number().required().min(1),
    currency: joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.editProductValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(3),
    description: joi.string().min(10),
    images: joi.array().min(1),
    shipsTo: joi.array().min(1),
    price: joi.number(),
    inStock: joi.number().min(1),
    currency: joi.string(),
  });

  return schema.validate(data);
};
