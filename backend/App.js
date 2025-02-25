const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger, debugLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');
const { login, createUser } = require('./controllers/users');
const { validateUserCreation, validateAuthentication } = require('./middleware/validations');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const errorHandler = require('./middleware/error-handler');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

app.use(helmet());

const corsOptions = {
  origin: [    
    "http://localhost:3000",
    "http://arounddemo.chickenkiller.com",
    "http://api.arounddemo.chickenkiller.com",
    "http://www.arounddemo.chickenkiller.com",
    "https://arounddemo.chickenkiller.com",
    "https://api.arounddemo.chickenkiller.com",
    "https://www.arounddemo.chickenkiller.com"
    ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Demasiadas peticiones, por favor intente más tarde' }
});

app.use(limiter);

app.use(express.json());

app.use(requestLogger);
if (process.env.NODE_ENV === 'development') {
  app.use(debugLogger);
}

app.post('/signin', validateAuthentication, login);
app.post('/signup', validateUserCreation, createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });

const gitignoreContent = `
# Logs
logs/
*.log
request.log
error.log
npm-debug.log*
`;

try {
  fs.writeFileSync('.gitignore', gitignoreContent, { flag: 'a' });
} catch (err) {
  console.error('Error al actualizar .gitignore:', err);
}

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});