const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID con formato inválido'
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.details?.[0]?.message || 'Datos inválidos enviados'
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: 'El email ya está registrado'
    });
  }

  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    message: statusCode === 500
      ? 'Se ha producido un error en el servidor'
      : message
  });
};

module.exports = errorHandler;