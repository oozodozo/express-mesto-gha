const Card = require('../models/card');
const {
  ERR_BAD_REQUEST, ERR_NOT_FOUND, ERR_DEFAULT,
} = require('../utils/constansErrors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERR_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (card.owner.toString() === _id) {
        Card.findByIdAndRemove(cardId)
          .then((cardData) => {
            if (!cardData) {
              return res.status(ERR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
            }
            return res.send({ message: cardData });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        return res.status(ERR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        return res.status(ERR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
