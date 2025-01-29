const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({ message: 'Tarjeta no encontrada' });
    }

    if (card.owner.toString() !== req.user._id) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta tarjeta' });
    }

    await Card.findByIdAndRemove(cardId);
    res.json({ message: 'Tarjeta eliminada con éxito' });

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'ID de tarjeta inválido' });
    }
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};