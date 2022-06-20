const { celebrate, Joi } = require('celebrate');
const linkRegex = require('../utils/constants');

const validatorUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validatorLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validatorUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validatorAboutUser = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validatorAvatar = celebrate({
  body: Joi.object({
    avatar: Joi.string().pattern(linkRegex),
  }),
});

const validatorCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validatorCard = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkRegex),
  }),
});

module.exports = {
  validatorUserId,
  validatorLogin,
  validatorUser,
  validatorAboutUser,
  validatorAvatar,
  validatorCardId,
  validatorCard,
};
