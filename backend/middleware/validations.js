const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateObjectId = (value, helpers) => {
  if (/^[0-9a-fA-F]{24}$/.test(value)) {
    return value;
  }
  return helpers.error('any.invalid');
};

const validateUserCreation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL)
  })
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
});

const validateProfileUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  })
});

const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL)
  })
});

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL)
  })
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validateObjectId)
  })
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validateObjectId)
  })
});

module.exports = {
  validateUserCreation,
  validateAuthentication,
  validateProfileUpdate,
  validateAvatarUpdate,
  validateCardCreation,
  validateCardId,
  validateUserId
};