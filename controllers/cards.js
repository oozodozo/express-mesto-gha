const Card = require('../models/card');
const {
  ERR_STATUS_BAD_REQUEST, ERR_STATUS_NOT_FOUND, ERR_STATUS_DEFAULT,
} = require('../errors/constansErrorsStatus');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERR_STATUS_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERR_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERR_STATUS_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(ERR_STATUS_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      if (card.owner.toString() === userId) {
        res.send({ message: card });
      } else {
        res.status(403).send({ message: 'Недостаточно прав'});
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERR_STATUS_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        res.status(ERR_STATUS_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERR_STATUS_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        res.status(ERR_STATUS_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERR_STATUS_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
