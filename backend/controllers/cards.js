const Card = require('../models/card');
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError
} = require('../errors');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.json(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({
      name,
      link,
      owner: req.user._id
    });
    res.status(201).json(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Datos de tarjeta inválidos'));
    } else {
      next(err);
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);

    if (!card) {
      throw new NotFoundError('Tarjeta no encontrada');
    }

    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('No tienes permiso para eliminar esta tarjeta');
    }

    await card.deleteOne();
    res.json({ message: 'Tarjeta eliminada con éxito' });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('ID de tarjeta inválido'));
    } else {
      next(err);
    }
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).populate('owner');

    if (!card) {
      throw new NotFoundError('Tarjeta no encontrada');
    }

    res.json(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('ID de tarjeta inválido'));
    } else {
      next(err);
    }
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).populate('owner');

    if (!card) {
      throw new NotFoundError('Tarjeta no encontrada');
    }

    res.json(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('ID de tarjeta inválido'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};