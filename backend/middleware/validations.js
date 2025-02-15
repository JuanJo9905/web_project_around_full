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
    name: Joi.string().min(2).max(30).default('Jacques Cousteau'),
    about: Joi.string().min(2).max(30).default('Explorador'),
    avatar: Joi.string().default('https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg')
  })
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
      email: Joi.string().required().email()
          .messages({
              'string.empty': 'El correo electrónico es requerido',
              'string.email': 'Formato de correo electrónico inválido',
              'any.required': 'El correo electrónico es requerido'
          }),
      password: Joi.string().required()
          .messages({
              'string.empty': 'La contraseña es requerida',
              'any.required': 'La contraseña es requerida'
          })
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