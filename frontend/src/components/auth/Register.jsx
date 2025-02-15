import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      console.log('Enviando datos:', formData); // Para debugging
      
      if (!formData.email || !formData.password) {
        throw new Error('Email y contraseña son requeridos');
      }
  
      if (formData.password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres');
      }
  
      await onRegister({
        email: formData.email,
        password: formData.password
      });
    } catch (err) {
      setError(err.message || 'Error en el registro');
      console.error('Error en registro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
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
          minLength="8"
        />
        {error && <span className="auth__error">{error}</span>}
        <button 
          type="submit" 
          className="auth__button"
          disabled={isLoading || !formData.email || formData.password.length < 8}
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      <div className="auth__signin">
        <p className="auth__register-text">
          ¿Ya eres miembro? <Link to="/signin" className="auth__login-link">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}
export default Register;