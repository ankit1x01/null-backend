const Joi = require('joi');

const createVenue = (req) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    chapter_id: Joi.number().integer().required(),
    map_url: Joi.string().uri().allow(null, ''),
    capacity: Joi.number().integer().min(1).allow(null),
    contact_name: Joi.string().required(),
    contact_email: Joi.string().email().allow(null, ''),
    contact_mobile: Joi.string().allow(null, ''),
    contact_notes: Joi.string().allow(null, '')
  });
  
  const { error, value } = schema.validate(req.body);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

const updateVenue = (req) => {
  const schema = Joi.object({
    name: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    map_url: Joi.string().uri().allow(null, ''),
    capacity: Joi.number().integer().min(1).allow(null),
    contact_name: Joi.string(),
    contact_email: Joi.string().email().allow(null, ''),
    contact_mobile: Joi.string().allow(null, ''),
    contact_notes: Joi.string().allow(null, '')
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

module.exports = {
  createVenue,
  updateVenue
};
