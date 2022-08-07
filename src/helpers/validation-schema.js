const joi = require("joi");

module.exports.addNewProductSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  unit: joi.number().required(),
});
