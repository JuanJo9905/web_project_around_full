import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="auth__input"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="auth__input"
          required
        />
        <button type="submit" className="auth__button">Registrarse</button>
      </form>
      <div className="auth__signin">
        <p className='auth__register-text'>¿Ya eres miembro? <Link to="/signin" className="auth__login-link">Inicia sesión aquí</Link></p>
      </div>
    </div>
  );
}

export default Register;