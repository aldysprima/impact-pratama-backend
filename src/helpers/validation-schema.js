const joi = require("joi");

module.exports.addNewProductSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  unit: joi.number().required(),
});

module.exports.updateProductSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  uom_id: joi.number().required(),
});
