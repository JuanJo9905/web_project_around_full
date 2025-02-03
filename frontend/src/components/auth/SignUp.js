import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onSignUp }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí implementarías la lógica de registro
    onSignUp(userData);
    navigate('/signin');
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({...userData, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={userData.password}
          onChange={(e) => setUserData({...userData, password: e.target.value})}
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={userData.confirmPassword}
          onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};