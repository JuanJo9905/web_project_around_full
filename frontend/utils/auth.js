//const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';
const BASE_URL = 'http://localhost:3000';

async function handleResponse(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  return Promise.reject(data.message || 'Error en la petición');
}

export const register = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  return handleResponse(response);
};

export const authorize = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  const data = await handleResponse(response);
  if (data.token) {
    localStorage.setItem('jwt', data.token);
    return data;
  }
  return Promise.reject('No se recibió token');
};

export const checkToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
};

export default {
  register,
  authorize,
  checkToken
};