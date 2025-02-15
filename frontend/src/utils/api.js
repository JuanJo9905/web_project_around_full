class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No hay token disponible');
    }
  
    return {
      ...this._headers,
      'Authorization': `Bearer ${token}`
    };
  }

  async _handleResponse(res) {
    const data = await res.json();
    if (res.ok) {
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
    const data = await this._handleResponse(response);
    return data;
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
    try {
        const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({ avatar })
        });
        return this._handleResponse(response);
    } catch (error) {
        console.error('Error en updateAvatar:', error);
        throw error;
    }
}
}


const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;