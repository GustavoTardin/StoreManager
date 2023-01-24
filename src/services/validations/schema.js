const Joi = require('joi');

const nameInsert = Joi.string().min(5);

module.exports = nameInsert;