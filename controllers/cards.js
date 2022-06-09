const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }));
};

const deleteCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (card.owner.toString() === _id) {
        Card.findByIdAndRemove(cardId)
          .then(() => {
            res.status(200).send({ message: 'Карточка удалена' });
          });
      }
    })
    .catch((err) => res.status(500).send({ message: err }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((likes) => res.send({ data: likes }))
    .catch((err) => res.status(500).send({ message: err }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((likes) => res.send({ data: likes }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
