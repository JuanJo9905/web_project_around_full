import { useContext } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(currentUserContext);
  
  // Verificando si el usuario actual es el propietario de la tarjeta
  const isOwn = card.owner._id === currentUser._id;
  
  // Clase para el botón eliminar
  const cardDeleteButtonClassName = `content__grid-image-delete ${
    !isOwn && 'content__grid-image-delete-hidden'
  }`;

  // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  // Clase para el botón like
  const cardLikeButtonClassName = `content__grid-like ${
    isLiked && 'content__grid-like-active'
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLike = () => {
    onCardLike(card);
  };

  const handleDelete = () => {
    onCardDelete(card);
  };

  return (
    <div className="content__grid-card">
      <img
        src={card.link} 
        alt={card.name}
        className="content__grid-image"
        onClick={handleClick}
      />
      {isOwn && (
        <div
          className={cardDeleteButtonClassName}
          onClick={handleDelete}
          aria-label="Eliminar tarjeta"
        />
      )}
      <div className="content__grid-card-description">
        <p className="content__grid-card-name">{card.name}</p>
        <div className="content__grid-card-container">
          <button 
            className={cardLikeButtonClassName} 
            onClick={handleLike}
            aria-label="Me gusta"
          />
          <p className="content__grid-number">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}