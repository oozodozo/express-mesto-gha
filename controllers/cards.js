const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err }))
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner})
    .then((card) => res.send({ data: card}))
    .catch((err) => res.status(500).send({ message: err }))
};

const deleteCard = (req, res) => {
  const { userId } = req.user;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if(card.owner._id === userId) {
        Card.findByIdAndRemove(cardId)
          .then((card) => res.send(card))
      }
    })
    .catch((err) => res.status(500).send({ message: err }))
};

module.exports = { getCards, createCard, deleteCard };