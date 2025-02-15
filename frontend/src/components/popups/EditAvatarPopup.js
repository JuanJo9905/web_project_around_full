import React,{ createRef } from "react";
import PopUpWithForm from "./PopUpWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const inputRef = createRef();
    function handleSubmit(e) {
      e.preventDefault();
      const url = inputRef.current.value.trim();
      try {
          new URL(url);
          onUpdateAvatar({
              avatar: url
          });
      } catch (e) {
          console.error('URL inválida:', e);
      }
  }
    return (
    <PopUpWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Cambiar foto de perfil"
      name="avatar"
      buttonText="Guardar"
      onSubmit = {handleSubmit}
    >
      <input
        type="url"
        id="editAvatar__window-form-link"
        className="popup__window-form-input popup__input"
        name="editAvatar__window-form-link"
        placeholder="Enlace a la imagen"
        ref={inputRef}
        required
      />
      <span
        id="editAvatar__window-form-link-error"
        className="popup__window-error"
      ></span>
    </PopUpWithForm>
  );
}

export default EditAvatarPopup;
