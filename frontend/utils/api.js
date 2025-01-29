class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      ...this._headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  async _handleResponse(res) {
    const data = await res.json();
    if (res.ok) {
      // Si la respuesta viene en formato { data: {...} }, devolvemos solo data
      return data.data || data;
    }
    return Promise.reject(data.message || 'Error en la petición');
  }

  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders()
    });
    return this._handleResponse(response);
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders()
    });
    return this._handleResponse(response);
  }

  async setUserInfo({ name, about }) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about })
    });
    return this._handleResponse(response);
  }

  async addCard({ name, link }) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link })
    });
    return this._handleResponse(response);
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    });
    return this._handleResponse(response);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this._getHeaders()
    });
    return this._handleResponse(response);
  }

  async updateAvatar(avatar) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar })
    });
    return this._handleResponse(response);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;