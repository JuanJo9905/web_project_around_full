import PopUpWithForm from './PopUpWithForm';
import { useState, useContext, useEffect } from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext';
// Ejemplo de como se desestructuran los parametros en lugar de obtener los parametros como props-> {isOpen, onClose}
export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(currentUserContext);
    const [name,setName] = useState("");
    const [description, setDescription] = useState("");
    function handleChangeName(e){
        setName(e.target.value);
    }
    function handleChangeDescription(e){
        setDescription(e.target.value);
    }
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    function handleSubmit(e) {
        // Evita que el navegador navegue hacia la dirección del formulario
        e.preventDefault();
      
        // Pasa los valores de los componentes gestionados al controlador externo
        onUpdateUser({
          name: name,
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
    onSubmit = {handleSubmit}
  >
    <input
      type="text"
      id="edit__window-form-name"
      className="popup__window-form-input popup__input"
      name="content__edit-form-title"
      placeholder="Nombre"
      onChange={handleChangeName}
      required
      minLength="2"
      value={name}
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
      onChange={handleChangeDescription}
      required
      minLength="2"
      value={description}
    />
    <span
      id="edit__window-form-title-error"
      className="popup__window-error"
    ></span>
  </PopUpWithForm>
  )
}
