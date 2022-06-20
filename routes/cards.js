const cardsRouter = require('express').Router();
const { validatorCardId, validatorCard } = require('../middlewares/joiValidate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validatorCard, createCard);
cardsRouter.delete('/:cardId', validatorCardId, deleteCard);
cardsRouter.put('/:cardId/likes', validatorCardId, likeCard);
cardsRouter.delete('/:cardId/likes', validatorCardId, dislikeCard);

module.exports = cardsRouter;
