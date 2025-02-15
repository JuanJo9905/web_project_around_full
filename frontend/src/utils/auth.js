//const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';
const BASE_URL = 'http://localhost:3001';

async function handleResponse(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  return Promise.reject(data.message || 'Error en la petición');
}

export const register = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        name: 'Jacques Cousteau',
        about: 'Explorador',
        avatar: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    return data;
  } catch (error) {
    console.error('Error completo:', error);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.status === 429) {
      throw new Error('Demasiados intentos. Por favor, espera un momento antes de intentar nuevamente.');
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error en el inicio de sesión');
    }

    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    }
    throw new Error('No se recibió token');
  } catch (error) {
    throw error;
  }
};

export const checkToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al verificar token');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  register,
  login,
  checkToken
};