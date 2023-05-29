const Joi = require('joi');

const NotesValidation = (payload) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.string().allow('', null),
  });

  return schema.validate(payload);
};
module.exports = NotesValidation;
