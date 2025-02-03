import React, {createRef} from "react";
import PopUpWithForm from "./PopUpWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const titleRef = createRef();
    const imageLinkRef = createRef();
    function handleSubmit(evt){
     evt.preventDefault();  
     onAddPlace(
        {
        name:titleRef.current.value, 
        link: imageLinkRef.current.value
        })
    }
  return (
    <PopUpWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit = {handleSubmit}
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
        ref={titleRef}
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
        ref={imageLinkRef}
        required
      />
      <span
        id="popup__window-form-link-error"
        className="popup__window-error"
      ></span>
    </PopUpWithForm>
  );
}

export default AddPlacePopup;
