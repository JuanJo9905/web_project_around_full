import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from "./layout/Header.jsx";
import Main from "./layout/Main.js";
import Footer from "./layout/Footer.js";
import PopUpWithForm from "./popups/PopUpWithForm.js";
import EditProfilePopup from './popups/EditProfilePopup';
import AddPlacePopup from './popups/AddPlacePopup';
import ImagePopup from "./popups/ImagePopup.js";
import EditAvatarPopup from "./popups/EditAvatarPopup.js";
import { currentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api.js';
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import InfoTooltip from "./auth/InfoTooltip.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import * as auth from '../utils/auth.js';

function AppMain() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [email, setEmail] = useState('');

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setEmail(res.email);
          setIsLoggedIn(true);
          return api.getUserInfo();
        })
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.error('Error al verificar token:', err);
          localStorage.removeItem('jwt');
          setIsLoggedIn(false);
          navigate('/signin');
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.error('Error al cargar datos iniciales:', err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
  }, [isEditAvatarPopupOpen]);

  useEffect(() => {
  }, [isEditProfilePopupOpen]);

  useEffect(() => {
  }, [isAddPlacePopupOpen]);

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

  function handleUpdateUser(userData) {
    const token = localStorage.getItem('jwt');
  
    if (!token) {
      console.error('Token no disponible');
      navigate('/signin');
      return;
    }
  
    // Actualizar el estado inmediatamente
    setCurrentUser(prevState => ({
      ...prevState,
      ...userData
    }));
  
    api.setUserInfo(userData)
      .then((newUserData) => {
        // Asegurar que los datos del servidor se apliquen
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error('Error al actualizar perfil:', err);
        // Revertir los cambios si hay error
        api.getUserInfo().then(userData => {
          setCurrentUser(userData);
        });
        if (err.message.includes('token')) {
          navigate('/signin');
        }
      });
  }
  
  function handleUpdateAvatar(avatarData) {
    api.updateAvatar(avatarData.avatar)
        .then((userData) => {
            setCurrentUser(userData);
            closeAllPopups();
        })
        .catch((err) => {
            console.error('Error al actualizar el avatar:', err);
        });
  }
  const handleLogin = async (formData) => {
    try {
      // Añadir retraso para evitar demasiadas peticiones
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = await auth.login(formData);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setEmail(formData.email);
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (err) {
      console.error('Error en handleLogin:', err);
      setIsInfoTooltipOpen(true);
      setIsSuccessful(false);
      
      // Mostrar mensaje al usuario
      if (err.message.includes('demasiadas peticiones')) {
        alert('Demasiados intentos. Por favor, espera un momento antes de intentar nuevamente.');
      }
    }
  };

  const handleRegister = async (userData) => {
    try {

      const data = await auth.register(userData);
      if (data) {
        setIsSuccessful(true);
        setIsInfoTooltipOpen(true);
        // Redirigir después del registro exitoso
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
    } catch (err) {
      console.error('Error en handleRegister:', err);
      setIsSuccessful(false);
      setIsInfoTooltipOpen(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    navigate('/signin');
  };

  function handleAddPlace(cardData) {
    api.addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]); // Agrega la nueva tarjeta al inicio
        closeAllPopups();
      })
      .catch((err) => {
        console.error('Error al agregar tarjeta:', err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error('Error al eliminar la tarjeta:', err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error('Error al actualizar el like:', err);
      });
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
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
                      onCardDelete={handleCardDelete}
                      onCardLike={handleCardLike}
                      cards={cards}
                    />
                  }
                />
              }
            />
          </Routes>

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            title="Cambiar foto de perfil"
            name="avatar"
            buttonText="Guardar"
          >
          </EditAvatarPopup>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
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
          </AddPlacePopup>

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
      </div>
    </currentUserContext.Provider>
  );
}

export default AppMain;