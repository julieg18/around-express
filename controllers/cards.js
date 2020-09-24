const CardModel = require('../models/card');
const { sendError } = require('../utils/utils');

function getCards(req, res) {
  CardModel.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      sendError({ err, res });
    });
}

function createCard(req, res) {
  const { name, link } = req.body;
  const { _id: owner } = req.user;
  CardModel.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      sendError({
        res,
        err,
        validationErrMessage: 'Card validation failed',
      });
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;

  CardModel.findByIdAndRemove(cardId)
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      sendError({
        res,
        err,
        castErrMessage: 'Card not found',
      });
    });
}

function likeCard(req, res) {
  const { cardId } = req.params;
  const { _id } = req.user;
  CardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .then((updatedCard) => {
      res.send(updatedCard);
    })
    .catch((err) => {
      sendError({ err, res, castErrMessage: 'Card not found' });
    });
}

function dislikeCard(req, res) {
  const { cardId } = req.params;
  const { _id } = req.user;
  CardModel.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((updatedCard) => {
      res.send(updatedCard);
    })
    .catch((err) => {
      sendError({ err, res, castErrMessage: 'Card not found' });
    });
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
