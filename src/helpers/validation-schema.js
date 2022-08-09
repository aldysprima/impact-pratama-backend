const joi = require("joi");

module.exports.addNewProductSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  unit: joi.number().required(),
});

module.exports.updateProductSchema = joi.object({
  name: joi.string(),
  description: joi.string(),
  price: joi.number(),
  uom_id: joi.number(),
});
