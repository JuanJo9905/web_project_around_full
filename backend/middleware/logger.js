const winston = require('winston');
const expressWinston = require('express-winston');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' })
  ],
  format: logFormat,
  requestWhitelist: ['url', 'method', 'httpVersion', 'originalUrl', 'query', 'body'],
  responseWhitelist: ['statusCode', 'body'],
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,

  skip: (req) => {
    const skipPaths = ['/signin', '/signup'];
    if (skipPaths.includes(req.path) && req.body) {
      delete req.body.password;
    }
    return false;
  }
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ],
  format: logFormat,
  meta: true,
  msg: '{{ err.message }}',

  dynamicMeta: (req, res, err) => ({
    userIP: req.ip,
    userAgent: req.headers['user-agent'],
    errorCode: err.statusCode || 500,
    errorMessage: err.message,
    url: req.originalUrl,
    method: req.method
  })
});

const debugLogger = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) {
      sanitizedBody.password = '[PROTECTED]';
    }
    
    console.log('------ Nueva Solicitud ------');
    console.log('Método:', req.method);
    console.log('URL:', req.url);
    console.log('Body:', sanitizedBody);
    console.log('Headers:', req.headers);
    console.log('--------------------------');
  }
  next();
};

module.exports = {
  requestLogger,
  errorLogger,
  debugLogger
};