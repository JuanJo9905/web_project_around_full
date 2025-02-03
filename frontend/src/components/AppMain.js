import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from "./layout/Header.jsx";
import Main from "./layout/Main.js";
import Footer from "./layout/Footer.js";
import PopUpWithForm from "./popups/PopUpWithForm.js";
import ImagePopup from "./popups/ImagePopup.js";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import InfoTooltip from "./auth/InfoTooltip.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import * as auth from '../utils/auth.js';

function AppMain() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('jwt');
        });
    }
  }, [navigate]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  const handleLogin = async ({ email, password }) => {
    try {
      const data = await auth.login(email, password);
      if (data.token) {
        setEmail(email);
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        navigate('/');
      }
    } catch (err) {
      console.log('Error en handleLogin:', err);
      setIsSuccessful(false);
      setIsInfoTooltipOpen(true);
      return Promise.reject(err);
    }
  };

  const handleRegister = ({ email, password }) => {
    auth.register(email, password)
      .then(() => {
        setIsSuccessful(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    navigate('/signin');
  };

  return (
    <div className="page">
      <Header 
        isLoggedIn={isLoggedIn} 
        email={email} 
        onSignOut={handleSignOut} 
      />
      
      <Routes>
        <Route 
          path="/signin" 
          element={
            !isLoggedIn ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            !isLoggedIn ? (
              <Register onRegister={handleRegister} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute 
              isLoggedIn={isLoggedIn}
              element={
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                />
              }
            />
          }
        />
      </Routes>

      <Footer />

      <PopUpWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        title="Cambiar foto de perfil"
        name="avatar"
        buttonText="Guardar"
      >
        <input
          type="url"
          id="editAvatar__window-form-link"
          className="popup__window-form-input popup__input"
          name="editAvatar__window-form-link"
          placeholder="Enlace a la imagen"
          required
        />
        <span
          id="editAvatar__window-form-link-error"
          className="popup__window-error"
        ></span>
      </PopUpWithForm>

      <PopUpWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        title="Editar Perfil"
        name="edit"
        buttonText="Guardar"
      >
        <input
          type="text"
          id="edit__window-form-name"
          className="popup__window-form-input popup__input"
          name="content__edit-form-title"
          placeholder="Nombre"
          required
          minLength="2"
        />
        <span
          id="edit__window-form-name-error"
          className="popup__window-error"
        ></span>
        <input
          type="text"
          id="edit__window-form-title"
          className="popup__window-form-input popup__input"
          name="edit__window-form-title"
          placeholder="Acerca de mi"
          required
          minLength="2"
        />
        <span
          id="edit__window-form-title-error"
          className="popup__window-error"
        ></span>
      </PopUpWithForm>

      <PopUpWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        title="Nuevo Lugar"
        name="avatar"
        buttonText="Guardar"
      >
        <input
          type="text"
          id="popup__window-form-title"
          className="popup__window-form-input popup__input"
          name="popup__window-form-title"
          placeholder="Titulo"
          required
        />
        <span
          id="popup__window-form-title-error"
          className="popup__window-error"
        ></span>
        <input
          type="url"
          id="popup__window-form-link"
          className="popup__window-form-input popup__input"
          name="popup__window-form-link"
          placeholder="Enlace a la imagen"
          required
        />
        <span
          id="popup__window-form-link-error"
          className="popup__window-error"
        ></span>
      </PopUpWithForm>

      <ImagePopup
        isOpen={isImagePopupOpen}
        link={selectedCard.link}
        name={selectedCard.name}
        onClose={closeAllPopups}
      />

      <InfoTooltip 
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccessful}
      />
    </div>
  );
}

export default AppMain;