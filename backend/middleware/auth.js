const jwt = require('jsonwebtoken');
const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';
const JWT_SECRET = 'token_secreto';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).json({ message: 'Acceso denegado: token inválido' });
  }

  req.user = payload;
  next();
};

module.exports.register = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    throw new Error('Error en el registro');
  }
  return await response.json();
};

module.exports.login = async ({ email, password }) => {
  try {
      console.log('Intentando login con:', { email, password }); // Debug

      const response = await fetch(`${BASE_URL}/signin`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Error en el inicio de sesión');
      }

      if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
      } else {
          throw new Error('No se recibió token de autenticación');
      }
  } catch (error) {
      console.error('Error completo:', error);
      throw error;
  }
};

module.exports.checkToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Token inválido');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};