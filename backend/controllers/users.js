const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  ConflictError
} = require('../errors');

const JWT_SECRET = 'token_secreto';

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError('Correo o contraseña incorrectos');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedError('Correo o contraseña incorrectos');
    }

    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name = 'Jacques Cousteau',
      about = 'Explorador',
      avatar = 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg'
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('El email ya está registrado');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Datos de usuario inválidos'));
    } else {
      next(err);
    }
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError('No se encontró el usuario');
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }

    res.json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Datos de perfil inválidos'));
    } else {
      next(err);
    }
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }

    res.json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('URL de avatar inválida'));
    } else {
      next(err);
    }
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
  updateAvatar,
  getUsers,
  getUserById
};