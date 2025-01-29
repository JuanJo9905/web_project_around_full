import { useContext } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";

export default function Card( props ) {
  const currentUser = useContext(currentUserContext);
  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = props.card.owner._id === currentUser._id;
  // Creando una variable que después establecerás en `className` para el botón eliminar
  const cardDeleteButtonClassName = (
    `content__grid-image-delete ${isOwn ? 'content__grid-image-delete' : 'content__grid-image-delete-hidden'}`
  );
    // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  // Crea una variable que después establecerás en `className` para el botón like
  const cardLikeButtonClassName = (
    `content__grid-like ${isLiked ? 'content__grid-like-active' : 'content__grid-like'}`
  );
    function handleClick(){
    props.onCardClick(props.card);
  }

  function handleLike(){
    props.onCardLike(props.card);
  }

  function handleDelete(){
    props.onCardDelete(props.card);
  }
  return (
    <div className="content__grid-card">
    <img
      src={props.link} 
      alt="card-image"
      className="content__grid-image"
      onClick={handleClick}
    />
    <div
      className={cardDeleteButtonClassName}
      onClick = {handleDelete}
    > 
    </div>
    <div className="content__grid-card-description">
      <p className="content__grid-card-name">{props.name}</p>
      <div className="content__grid-card-container">
        <button className={cardLikeButtonClassName} onClick={handleLike}></button>
        <p className="content__grid-number">{props.likes.length}</p>
      </div>
    </div>
  </div>
  )
}
