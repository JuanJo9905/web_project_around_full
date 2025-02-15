import PopUpWithForm from './PopUpWithForm';
import { useState, useContext, useEffect } from 'react';
import { currentUserContext } from '../../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(currentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [localUser, setLocalUser] = useState(currentUser);

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
      setLocalUser(currentUser);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    // Actualizar el estado local inmediatamente
    setLocalUser({
      ...localUser,
      name: name,
      about: description
    });

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopUpWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Perfil"
      name="edit"
      buttonText="Guardar"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="edit__window-form-name"
        className="popup__window-form-input popup__input"
        name="content__edit-form-title"
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
        value={name || ''}
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
        onChange={(e) => setDescription(e.target.value)}
        value={description || ''}
        required
        minLength="2"
      />
      <span
        id="edit__window-form-title-error"
        className="popup__window-error"
      ></span>
    </PopUpWithForm>
  );
}